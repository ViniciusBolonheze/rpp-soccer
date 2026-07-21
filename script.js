const p=new URLSearchParams(location.search);
const f=(i,k)=>{let e=document.getElementById(i),v=p.get(k);if(e&&v!==null)e.textContent=v;};
['Nome','Nascimento','Cidade','Posicao','ClubeAtual','ClubesAntigos','Peso','Altura','Perna','Nacionalidade','Chuteira','Extras'].forEach(k=>f(k.charAt(0).toLowerCase()+k.slice(1).replace('Atual','Atual').replace('Antigos','Antigos'),k));
document.getElementById('nome').textContent=p.get('Nome')||'';
document.getElementById('nascimento').textContent=p.get('Nascimento')||'';
document.getElementById('cidade').textContent=p.get('Cidade')||'';
document.getElementById('posicao').textContent=p.get('Posicao')||'';
document.getElementById('clubeAtual').textContent=p.get('ClubeAtual')||'';
document.getElementById('clubesAntigos').textContent=p.get('ClubesAntigos')||'';
document.getElementById('peso').textContent=p.get('Peso')||'';
document.getElementById('altura').textContent=p.get('Altura')||'';
document.getElementById('perna').textContent=p.get('Perna')||'';
document.getElementById('nacionalidade').textContent=p.get('Nacionalidade')||'';
document.getElementById('chuteira').textContent=p.get('Chuteira')||'';
let i=p.get('Instagram');if(i)document.getElementById('instagram').textContent='@'+i;
let c=p.get('Contato');if(c)document.getElementById('contato').textContent=c;
let x=p.get('Extras');if(x)document.getElementById('extras').textContent=x;
let foto=p.get('Foto1');if(foto)document.getElementById('fotoAtleta').src=foto;

document.addEventListener("DOMContentLoaded",()=>{
 const b=document.getElementById("btnCompartilhar");
 if(b) b.addEventListener("click",gerarPDF);
});

async function gerarPDF(){
 const btn=document.getElementById("btnCompartilhar");
 btn.style.visibility="hidden";
 const alvo=document.querySelector(".container")||document.body;
 const canvas=await html2canvas(alvo,{scale:2});
 btn.style.visibility="visible";
 const {jsPDF}=window.jspdf;
 const pdf=new jsPDF("p","mm","a4");
 const w=190,h=canvas.height*w/canvas.width;
 pdf.addImage(canvas.toDataURL("image/png"),"PNG",10,10,w,h);
 const nome=(new URLSearchParams(location.search).get("Nome")||"Atleta").trim();
 const blob=pdf.output("blob");
 const file=new File([blob],`Ficha - ${nome}.pdf`,{type:"application/pdf"});
 if(navigator.canShare && navigator.canShare({files:[file]})){
   try{await navigator.share({files:[file],title:file.name});return;}catch(e){}
 }
 pdf.save(file.name);
}
