const API_ENDPOINT = 'https://membros.kalifranca.com.br/api/mentoria-frequencia-da-abundancia/applications';
const form = document.querySelector('#application-form');
const steps = [...document.querySelectorAll('[data-question]')];
const intro = document.querySelector('[data-step="intro"]');
const success = document.querySelector('[data-step="success"]');
const progressWrap = document.querySelector('[data-progress-wrap]');
const progress = document.querySelector('[data-progress]');
const progressLabel = document.querySelector('[data-progress-label]');
const progressPercent = document.querySelector('[data-progress-percent]');
const actions = document.querySelector('[data-actions]');
const backButton = document.querySelector('[data-back]');
const nextButton = document.querySelector('[data-next]');
const submitButton = document.querySelector('[data-submit]');
const feedback = document.querySelector('[data-feedback]');
const commitment = document.querySelector('[name="commitment_score"]');
const commitmentOutput = document.querySelector('[data-commitment-output]');

let currentStep = -1;
let isSubmitting = false;

function createSubmissionId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  if (window.crypto?.getRandomValues) {
    const bytes = new Uint8Array(16);
    window.crypto.getRandomValues(bytes);
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    return [...bytes].map((byte, index) => {
      const value = byte.toString(16).padStart(2, '0');
      return [4, 6, 8, 10].includes(index) ? `-${value}` : value;
    }).join('');
  }
  return '00000000-0000-4000-8000-000000000000';
}

const clientSubmissionId = createSubmissionId();

function setFeedback(message = '') {
  feedback.textContent = message;
}

function focusStep(step) {
  const heading = step.querySelector('h1, h2, legend');
  if (!heading) return;
  if (!heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1');
  window.requestAnimationFrame(() => heading.focus({ preventScroll: true }));
}

function updateProgress() {
  const visibleStep = steps[currentStep];
  const stepNumber = currentStep + 1;
  const percentage = Math.round((stepNumber / steps.length) * 100);
  progressWrap.hidden = false;
  progress.value = stepNumber;
  progressLabel.textContent = `Etapa ${stepNumber} de ${steps.length}`;
  progressPercent.textContent = `${percentage}%`;
  visibleStep.hidden = false;
  actions.hidden = false;
  backButton.hidden = false;
  nextButton.hidden = stepNumber === steps.length;
  submitButton.hidden = stepNumber !== steps.length;
}

function showStep(index) {
  if (index < 0 || index >= steps.length) return;
  steps.forEach((step, stepIndex) => {
    step.hidden = stepIndex !== index;
  });
  intro.hidden = true;
  success.hidden = true;
  currentStep = index;
  updateProgress();
  setFeedback('');
  focusStep(steps[index]);
}

function showIntro() {
  currentStep = -1;
  intro.hidden = false;
  success.hidden = true;
  steps.forEach((step) => { step.hidden = true; });
  progressWrap.hidden = true;
  actions.hidden = true;
  setFeedback('');
}

function showSuccess() {
  steps.forEach((step) => { step.hidden = true; });
  intro.hidden = true;
  success.hidden = false;
  progressWrap.hidden = true;
  actions.hidden = true;
  setFeedback('');
  focusStep(success);
}

function validateCurrentStep() {
  const step = steps[currentStep];
  const controls = [...step.querySelectorAll('input, textarea, select')];
  const invalid = controls.find((control) => !control.checkValidity());
  if (!invalid) return true;
  invalid.reportValidity();
  setFeedback('Revise esta etapa antes de avançar.');
  invalid.focus();
  return false;
}

function getPayload() {
  const data = Object.fromEntries(new FormData(form).entries());
  return {
    full_name: data.full_name,
    age_range: data.age_range,
    sex: data.sex,
    email: data.email,
    whatsapp: data.whatsapp,
    city_state: data.city_state,
    challenge: data.challenge,
    beliefs: data.beliefs,
    energy_tools_experience: data.energy_tools_experience,
    priority_area: data.priority_area,
    current_state: data.current_state,
    predominant_feeling: data.predominant_feeling,
    previous_support: data.previous_support,
    perceived_block: data.perceived_block,
    desired_wins: data.desired_wins,
    commitment_score: Number(data.commitment_score),
    investment_readiness: data.investment_readiness,
    consent: Boolean(data.consent),
    honeypot: data.honeypot || '',
    client_submission_id: clientSubmissionId,
  };
}

async function submitApplication() {
  if (isSubmitting || !validateCurrentStep()) return;
  isSubmitting = true;
  submitButton.disabled = true;
  nextButton.disabled = true;
  setFeedback('Recebendo a sua aplicação.');

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(getPayload()),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.accepted !== true) {
      throw new Error(result.error || 'Não foi possível concluir o envio agora.');
    }
    showSuccess();
  } catch (error) {
    setFeedback(error instanceof Error ? error.message : 'Não foi possível concluir o envio agora. Tente novamente.');
  } finally {
    isSubmitting = false;
    submitButton.disabled = false;
    nextButton.disabled = false;
  }
}

document.querySelector('[data-start]').addEventListener('click', () => showStep(0));

backButton.addEventListener('click', () => {
  if (currentStep === 0) return showIntro();
  showStep(currentStep - 1);
});

nextButton.addEventListener('click', () => {
  if (validateCurrentStep()) showStep(currentStep + 1);
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  submitApplication();
});

commitment.addEventListener('input', () => {
  commitmentOutput.value = commitment.value;
  commitmentOutput.textContent = commitment.value;
});

showIntro();
