# Arquitetura do Cofre Kalì Franca Implementation Plan

> For agentic workers: REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax.

Goal: Reorganize the personal Obsidian vault cofre-kali into a central hub with semantic project areas, consistent properties and validated internal links.

Architecture: Create numbered folders for index, context, brand, product, operations and archive. Move the 11 existing notes without deleting or renaming them, then create a central MOC, a future-only roadmap and a usage guide. Use the Obsidian CLI for vault mutations and Git for durable versioning.

Tech Stack: Obsidian CLI, Obsidian Flavored Markdown, YAML frontmatter and Git.

## Global Constraints

- The vault is used only by Leonardo at this stage.
- The active vault path is D:/LEONARDO/Kali Franca/cofre-kali.
- Existing notes must be moved, not deleted or renamed.
- Historical evidence must remain intact; current updates are appended as dated sections.
- The external source at D:/LEONARDO/Kali Franca/design-system remains referenced and is not copied into the vault.
- Do not alter the web application, members app, CRM or marketing copy in this vault task.
- Use wikilinks for internal notes and Markdown links for external URLs.
- Preserve the untracked .obsidian, design-system and referencias directories.

---

## File Map

- Create: cofre-kali/00 - Índice/MOC - Kalì Franca.md — primary navigation hub.
- Create: cofre-kali/00 - Índice/Roadmap - Kalì Franca.md — future initiatives only.
- Create: cofre-kali/00 - Índice/Como usar este cofre.md — individual operating rules.
- Move: the 11 existing Markdown notes into the four semantic areas below.
- Modify: moved notes only to add the area property where missing.
- Create: cofre-kali/00 - Índice/Arquitetura do cofre Kalì Franca - Registro V1.md — final delivery record.

## Task 1: Create folders and index notes

Files:
- Create: 00 - Índice/MOC - Kalì Franca.md
- Create: 00 - Índice/Roadmap - Kalì Franca.md
- Create: 00 - Índice/Como usar este cofre.md

Interfaces:
- Consumes the existing note titles and the approved architecture specification.
- Produces three valid Obsidian notes linked to the current project knowledge.

- [x] Step 1: Create folders through the Obsidian CLI

Run the create command with a temporary note path inside each folder, then move the temporary note to trash through the CLI. Do not use permanent deletion. If the CLI creates parent folders automatically, verify them with folders total and do not create duplicates.

    obsidian vault="cofre-kali" create path="00 - Índice/.folder-probe.md" content="folder probe" silent
    obsidian vault="cofre-kali" delete path="00 - Índice/.folder-probe.md"
    obsidian vault="cofre-kali" folders total

Repeat the probe only for 01 - Contexto e Estratégia, 02 - Marca e Design, 03 - Produto e Experiência, 04 - Operação e Deploy and 90 - Arquivo.

- [x] Step 2: Create the MOC

Create the note with frontmatter type index, status active and area indice. It must contain these headings and links:

    # Kalì Franca — MOC
    ## Estado atual
    ## Contexto e estratégia
    ## Marca e design
    ## Produto e experiência
    ## Operação e deploy
    ## Decisões e entregas
    ## Próximo movimento

The Estado atual table must link the main domain to Home visual - Registro de implementação V1, members to Diagnóstico - Falha de compilação Hostinger, brandbook to Brandbook online - Registro de implementação V1 and the source map to Design system - Mapa da fonte V1. The Produto e experiência section must also link Diagnóstico visual inicial - Experiência web. All other existing notes must appear in the corresponding sections using wikilinks.

- [x] Step 3: Create the roadmap and usage guide

Roadmap frontmatter: type roadmap, status active, area indice. It must contain one future-only unchecked item: replace the demonstrative sales page with a definitive offer after validating content, pricing, conditions and proof. State that a roadmap item is not an execution commitment, deadline or commercial promise.

Usage guide frontmatter: type reference, status active, area indice. It must document the seven-step flow: choose area by decision context, preserve historical evidence, fill properties, use wikilinks, update the MOC, separate facts/inferences/hypotheses/roadmap and version important changes.

## Task 2: Move existing notes without loss

Files:
- Move four notes to 01 - Contexto e Estratégia.
- Move four notes to 02 - Marca e Design.
- Move two notes to 03 - Produto e Experiência.
- Move one note to 04 - Operação e Deploy.
- Keep 90 - Arquivo available but empty until a genuine archived note exists.

Interfaces:
- Consumes exact current note names.
- Produces the same 11 notes at stable semantic paths, with internal links preserved by Obsidian.

- [x] Step 1: Move the exact notes through the CLI

    obsidian vault="cofre-kali" move path="Contexto digital do projeto.md" to="01 - Contexto e Estratégia"
    obsidian vault="cofre-kali" move path="Registro de início do projeto.md" to="01 - Contexto e Estratégia"
    obsidian vault="cofre-kali" move path="Perfil, Promessa e ICP.md" to="01 - Contexto e Estratégia"
    obsidian vault="cofre-kali" move path="Escopo - Página de vendas demonstrativa.md" to="01 - Contexto e Estratégia"
    obsidian vault="cofre-kali" move path="Design system como base de conhecimento.md" to="02 - Marca e Design"
    obsidian vault="cofre-kali" move path="Design system - Mapa da fonte V1.md" to="02 - Marca e Design"
    obsidian vault="cofre-kali" move path="Escopo - Brandbook online.md" to="02 - Marca e Design"
    obsidian vault="cofre-kali" move path="Brandbook online - Registro de implementação V1.md" to="02 - Marca e Design"
    obsidian vault="cofre-kali" move path="Diagnóstico visual inicial - Experiência web.md" to="03 - Produto e Experiência"
    obsidian vault="cofre-kali" move path="Home visual - Registro de implementação V1.md" to="03 - Produto e Experiência"
    obsidian vault="cofre-kali" move path="Diagnóstico - Falha de compilação Hostinger.md" to="04 - Operação e Deploy"

- [x] Step 2: Verify the count and locations

Run files ext=md total and each area-specific files command. Expected result is 14 Markdown files before the delivery record: 11 moved notes plus three index notes. Each existing title must appear once and no note must remain at the vault root.

## Task 3: Normalize the minimum property set

Files:
- Modify the 11 moved notes that do not already have area.
- Preserve title, aliases, date, tags, type, status, source and all historical content.

Interfaces:
- Consumes moved note paths and controlled values from the specification.
- Produces one area property per moved note and area indice on the three index notes.

- [x] Step 1: Set area properties through the CLI

Use property:set with type=text on the moved notes:

    Contexto e Estratégia: area=contexto
    Marca e Design: area=marca
    Produto e Experiência: area=produto
    Operação e Deploy: area=operacao

Do not change an existing type or status unless the current value is demonstrably inconsistent with the note.

- [x] Step 2: Inspect properties

Run properties format=yaml and search for area: in each numbered area. Expected result: every moved note has the area matching its folder and the three index notes have area indice.

## Task 4: Validate the graph and register the migration

Files:
- Create: cofre-kali/00 - Índice/Arquitetura do cofre Kalì Franca - Registro V1.md
- Modify: the moved context note only if its MOC relation is absent.

Interfaces:
- Consumes the final folder tree, properties and link validation output.
- Produces durable delivery evidence and a navigable MOC.

- [x] Step 1: Validate links and backlinks

    obsidian vault="cofre-kali" unresolved total
    obsidian vault="cofre-kali" unresolved verbose
    obsidian vault="cofre-kali" backlinks path="00 - Índice/MOC - Kalì Franca.md" total
    obsidian vault="cofre-kali" outline path="00 - Índice/MOC - Kalì Franca.md" format=tree

Expected: zero unresolved links introduced by migration, at least one MOC backlink and all MOC headings present.

- [x] Step 2: Create the final delivery record

Create the note with type delivery, status local-validado and area indice. Record the final count of 15 Markdown files, final tree, property convention, unresolved-link result, Obsidian CLI path, Git commit and preserved untracked directories. Link it from the MOC under Decisões e entregas.

- [x] Step 3: Run final checks and commit

    git diff --check
    git status --short
    git diff --stat
    git add -- cofre-kali docs/superpowers/plans/2026-08-28-cofre-kali-architecture.md
    git commit -m "docs: organiza arquitetura do cofre kali"
    git push origin main

Expected: only planned vault/docs changes are staged; .obsidian, design-system and referencias remain untouched.

## Task 5: Final delivery gate

- [x] Step 1: Confirm remote and vault

    git branch --show-current
    git rev-parse HEAD
    git ls-remote origin refs/heads/main
    obsidian vault="cofre-kali" vault info=path
    obsidian vault="cofre-kali" files ext=md total
    obsidian vault="cofre-kali" unresolved total

Expected: branch main, local and remote SHA equal, vault path D:/LEONARDO/Kali Franca/cofre-kali, file count 15 and unresolved links 0.

- [x] Step 2: Report the final architecture

Report the MOC path, folder distribution, property and link validation, final commit and preserved untracked directories. State separately that this task reorganized knowledge management only and did not modify web application code.
