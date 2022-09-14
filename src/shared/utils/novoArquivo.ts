let value = '9BWZiZ02Q8dAA1234';
let i = /[iI]/g; // Letras i = minúscula e maíscula;
let o = /[oO]/g; // Letras o = minúscula e maíscula.
let q = /[qQ]/g; // Letras q = minúscula e maíscula.
let ultimosQuatroDigitos = /^[0-9]+$/g; // Ultimos 4 digitos precisam ser números.
let tamTotal = 17; // Tamanho total do valor.

// Possuir o número “0” (ZERO) como 1º dígito:
// Se o Q estiver no começo do chassi, não pode ser substituído pelo numeral 0, então seguiríamos com a mensagem de erro.
const verificaPrimeiroDigito = (string) => /^[a-p-r-zA-P-R-Z1-9]/g.test(string);

const verificaPrimeiroDigitoLetraQ = (string) =>
  /^[a-p-r-zA-P-R-Z0-9]/g.test(string);
const verificaPrimeiroDigitoNumer0 = (string) => /^[a-zA-Z1-9]/g.test(string);

const verificaQuatroUltimosDigitos = (string) => {
  let ultimos = string.slice(13, 17);
  return ultimosQuatroDigitos.test(ultimos);
};

// Mudar 'ItemDe' para 'ItemPara' do 'Valor' recebido
const validaLetra = (valor: string, itemDe: any, itemPara: any) =>
  valor.replace(itemDe, itemPara.toString());

// Validar se tem espaco
const verificaEspaco = (string) => /\s/g.test(string);

// Não pode haver repetições consecutivas por mais de 6 vezes do mesmo caractere (numérico ou alfabético) a partir do 4º dígito.
const validarRepeticoes = (string) => {
  let ini = 4;
  let fim = 10;
  let isValid = true;
  do {
    let truncated_text = string.slice(ini, fim);
    if (
      truncated_text[0] == truncated_text[1] &&
      truncated_text[1] == truncated_text[2] &&
      truncated_text[2] == truncated_text[3] &&
      truncated_text[3] == truncated_text[4] &&
      truncated_text[4] == truncated_text[5]
    ) {
      isValid = false;
    }
    ini++;
    fim++;
  } while (fim <= string.length && isValid);
  return isValid;
};

const erros: any[] = [];
const infos: any[] = [];

value = '9BWZiZo2Q8dAAAAAA';
const mensagemErro = (string) => erros.push(string);
const mensagemInfo = (string) => infos.push(string);

//Validacao Geral
if (value.length == tamTotal) {
  // Os quatro últimos caracteres devem ser obrigatoriamente numéricos
  verificaQuatroUltimosDigitos(value)
    ? value
    : mensagemErro(
        'Os quatro últimos caracteres devem ser obrigatoriamente numéricos'
      );

  // Possuir o número “0” (ZERO) como 1º dígito:
  verificaPrimeiroDigitoNumer0(value)
    ? value
    : mensagemErro('Possuir o número “0” (ZERO) como 1º dígito');

  // Se o Q estiver no começo do chassi, não pode ser substituído pelo numeral 0, então seguiríamos com a mensagem de erro.
  verificaPrimeiroDigitoLetraQ(value)
    ? value
    : mensagemErro('Letra "Q" está no começo do chassi');

  // Não pode haver repetições consecutivas por mais de 6 vezes do mesmo caractere (numérico ou alfabético) a partir do 4º dígito.
  validarRepeticoes(value)
    ? value
    : mensagemErro(
        'Não pode haver repetições consecutivas por mais de 6 vezes do mesmo caractere (numérico ou alfabético) a partir do 4º dígito.'
      );

  // Substituição automática da letra “i” pelo número “1” (um);
  i.test(value)
    ? validaLetra(value, i, 1)
      ? mensagemInfo(
          'Substituição automática da letra “i” pelo número “1” (um).'
        )
      : value
    : value;

  // Substituição Automática das letras “o” para o numeral 0.
  o.test(value)
    ? validaLetra(value, o, 0)
      ? mensagemInfo('Substituição Automática das letras “o” para o numeral 0.')
      : value
    : value;

  // Substituição Automática das letras “q” para o numeral 0.
  q.test(value)
    ? validaLetra(value, q, 0)
      ? mensagemInfo('Substituição Automática das letras “q” para o numeral 0.')
      : value
    : value;

  // Valida se tem espaço em branco
  verificaEspaco(value)
    ? (value = value.replace(' ', ''))
      ? mensagemErro('O CHASSI não pode ter espaço entre os caracteres')
      : value
    : value;
} else if (value.length < tamTotal) {
  console.log(
    'Sugestão: “CHASSSI com menos de 17 caracteres, favor enviar consulta por placa”'
  );
} else {
  console.log('Erro: Chassi informado é invalido!');
}

erros.length ? console.log(erros) : infos.length ? console.log(infos) : value;

if (!erros.length) console.log(value);
