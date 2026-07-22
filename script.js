const p = new URLSearchParams(window.location.search);

// =======================
// PREENCHIMENTO DOS CAMPOS
// =======================

function setText(id, param) {

    const el = document.getElementById(id);

    if (!el) return;

    const valor = p.get(param);

    el.textContent = valor ? valor.trim() : "";

}

setText("nome", "Nome");
setText("nascimento", "Nascimento");
setText("cidade", "Cidade");
setText("posicao", "Posicao");
setText("clubeAtual", "ClubeAtual");
setText("clubesAntigos", "ClubesAntigos");
setText("peso", "Peso");
setText("altura", "Altura");
setText("perna", "Perna");
setText("nacionalidade", "Nacionalidade");
setText("chuteira", "Chuteira");

// =======================
// INFORMAÇÕES ADICIONAIS
// =======================

const extrasEl = document.getElementById("extras");

if (extrasEl) {

    const extras = p.get("Extras");

    extrasEl.innerHTML = extras ? extras.trim() : "";

}

// =======================
// INSTAGRAM
// =======================

const instagram = p.get("Instagram");

const instagramEl = document.getElementById("instagram");
const instagramTopoEl = document.getElementById("instagramTopo");

let instagramTexto = "";

if (instagram) {

    instagramTexto = instagram.startsWith("@")
        ? instagram
        : "@" + instagram;

}

if (instagramEl) {

    instagramEl.textContent = instagramTexto;

}

if (instagramTopoEl) {

    instagramTopoEl.textContent = instagramTexto;

}

// =======================
// CONTATO
// =======================

const contato = p.get("Contato") || "";

const contatoEl = document.getElementById("contato");
const contatoTopoEl = document.getElementById("contatoTopo");

if (contatoEl) {

    contatoEl.textContent = contato;

}

if (contatoTopoEl) {

    contatoTopoEl.textContent = contato;

}

// =======================
// FOTO
// =======================

const foto = document.getElementById("fotoAtleta");

const fotoURL = p.get("Foto1");

if (foto && fotoURL) {

    foto.src = fotoURL;

    foto.crossOrigin = "anonymous";

}

// =======================
// BOTÃO
// =======================

document.addEventListener("DOMContentLoaded", () => {

    const botao = document.getElementById("btnCompartilhar");

    if (botao) {

        botao.addEventListener("click", gerarPDF);

    }

});

// =======================
// PDF
// =======================

async function gerarPDF() {

    const botao = document.getElementById("btnCompartilhar");

    if (botao) botao.style.display = "none";

    try {

        if (foto && !foto.complete) {

            await new Promise(resolve => {

                foto.onload = resolve;
                foto.onerror = resolve;

            });

        }

        await new Promise(resolve => setTimeout(resolve, 300));

        const nome = (p.get("Nome") || "Atleta").trim();

        const elemento = document.querySelector(".pdf");

        const options = {

            margin: 0,

            filename: `Ficha - ${nome}.pdf`,

            image: {

                type: "jpeg",
                quality: 1

            },

            html2canvas: {

                scale: 4,
                useCORS: true,
                allowTaint: false,
                backgroundColor: "#111111",
                scrollX: 0,
                scrollY: 0

            },

            pagebreak: {

                mode: ["avoid-all", "css"]

            },

            jsPDF: {

                unit: "mm",
                format: "a4",
                orientation: "portrait",
                compress: true

            }

        };

        const worker = html2pdf()
            .set(options)
            .from(elemento);

        const blob = await worker.outputPdf("blob");

        const arquivo = new File(
            [blob],
            `Ficha - ${nome}.pdf`,
            { type: "application/pdf" }
        );

        if (navigator.canShare?.({ files: [arquivo] })) {

            try {

                await navigator.share({

                    files: [arquivo],
                    title: arquivo.name

                });

            } catch {

                await html2pdf()
                    .set(options)
                    .from(elemento)
                    .save();

            }

        } else {

            await html2pdf()
                .set(options)
                .from(elemento)
                .save();

        }

    } catch (erro) {

        console.error(erro);

    } finally {

        if (botao) botao.style.display = "";

    }

}