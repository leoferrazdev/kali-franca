<?php
declare(strict_types=1);

header('Cache-Control: no-store');
header('Content-Type: application/json; charset=utf-8');

function responder(int $status): void
{
    http_response_code($status);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    responder(405);
}

$tipo = strtolower(trim(explode(';', $_SERVER['CONTENT_TYPE'] ?? '')[0]));
if ($tipo !== 'application/json') {
    responder(415);
}

$corpo = file_get_contents('php://input', false, null, 0, 4097);
if ($corpo === false || strlen($corpo) > 4096) {
    responder(413);
}

$dados = json_decode($corpo, true);
$nome = is_string($dados['nome'] ?? null) ? trim($dados['nome']) : '';
$email = is_string($dados['email'] ?? null) ? trim($dados['email']) : '';
$celular = is_string($dados['celular'] ?? null) ? $dados['celular'] : '';
$jaFez = $dados['jaFez'] ?? null;
$digitos = preg_replace('/\D/', '', $celular);

if ($nome === '' || strlen($nome) > 400 || strlen($email) > 254
    || !filter_var($email, FILTER_VALIDATE_EMAIL) || !is_bool($jaFez)
    || strlen($celular) > 24 || !preg_match('/^(?:55)?[1-9]\d9\d{8}$/D', $digitos)) {
    responder(422);
}

try {
    $raiz = realpath($_SERVER['DOCUMENT_ROOT'] ?? '');
    if ($raiz === false || dirname($raiz) === $raiz) {
        throw new RuntimeException('Diretório privado indisponível');
    }
    $privado = dirname($raiz) . DIRECTORY_SEPARATOR . '.nova-eu-privado';
    if (is_link($privado)) {
        throw new RuntimeException('Diretório privado inválido');
    }
    umask(0077);
    if (!is_dir($privado) && !@mkdir($privado, 0700) && !is_dir($privado)) {
        throw new RuntimeException('Diretório privado indisponível');
    }
    $db = new PDO('sqlite:' . $privado . DIRECTORY_SEPARATOR . 'cadastros.sqlite3');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db->exec('PRAGMA busy_timeout = 5000');
    $db->exec('CREATE TABLE IF NOT EXISTS cadastros (
        nome TEXT NOT NULL,
        email TEXT NOT NULL,
        celular TEXT NOT NULL,
        ja_fez INTEGER NOT NULL,
        criado_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (nome, email, celular, ja_fez)
    )');
    $inserir = $db->prepare('INSERT INTO cadastros (nome, email, celular, ja_fez)
        VALUES (:nome, :email, :celular, :ja_fez)
        ON CONFLICT (nome, email, celular, ja_fez) DO NOTHING');
    $inserir->execute([
        'nome' => $nome,
        'email' => strtolower($email),
        'celular' => '+55' . substr($digitos, -11),
        'ja_fez' => (int) $jaFez,
    ]);
} catch (Throwable $erro) {
    error_log('Nova Eu: falha ao registrar cadastro (' . get_class($erro) . ')');
    responder(503);
}

responder(204);
