class RecintosZoo {
  constructor() {
    this.recintos = [
      {
        numero: 1,
        bioma: "savana",
        tamanho: 10,
        animais: ["MACACO", "MACACO", "MACACO"],
      },
      { numero: 2, bioma: "floresta", tamanho: 5, animais: [] },
      { numero: 3, bioma: "savana e rio", tamanho: 7, animais: ["GAZELA"] },
      { numero: 4, bioma: "rio", tamanho: 8, animais: [] },
      { numero: 5, bioma: "savana", tamanho: 9, animais: ["LEAO"] },
    ];

    this.animais = {
      LEAO: { tamanho: 3, biomas: ["savana"], carnivoro: true },
      LEOPARDO: { tamanho: 2, biomas: ["savana"], carnivoro: true },
      CROCODILO: { tamanho: 3, biomas: ["rio"], carnivoro: true },
      MACACO: { tamanho: 1, biomas: ["savana", "floresta"], carnivoro: false },
      GAZELA: { tamanho: 2, biomas: ["savana"], carnivoro: false },
      HIPOPOTAMO: { tamanho: 4, biomas: ["savana", "rio"], carnivoro: false },
    };
  }

  analisaCarnivoros(nome_animal, quantidade) {
    let recintosViaveis = [];
    for (let recinto of this.recintos) {
      let espacoOcupado = recinto.animais.reduce(
        (acc, animal) => acc + this.animais[animal.toUpperCase()].tamanho,
        0
      );
      let espacoDisponivel = recinto.tamanho - espacoOcupado;
      let biomasRecinto = recinto.bioma.split(" e ");
      if (
        espacoDisponivel >= this.animais[nome_animal].tamanho * quantidade &&
        this.animais[nome_animal].biomas.some((bioma) =>
          biomasRecinto.includes(bioma)
        ) &&
        (recinto.animais.length === 0 ||
          recinto.animais.every((a) => a.toUpperCase() === nome_animal))
      ) {
        recintosViaveis.push(
          `Recinto ${recinto.numero} (espaço livre: ${
            espacoDisponivel - this.animais[nome_animal].tamanho * quantidade
          } total: ${recinto.tamanho})`
        );
      }
    }
    if (recintosViaveis.length === 0) {
      return { erro: "Não há recinto viável" };
    }
    return { recintosViaveis };
  }

  analisaRecintos(nome_animal, quantidade) {
    // Verifica se o animal é válido
    if (!this.animais[nome_animal]) {
      return { erro: "Animal inválido" };
    }
    // Verifica se a quantidade é válida
    if (quantidade <= 0 || !Number.isInteger(quantidade)) {
      return { erro: "Quantidade inválida" };
    }

    let carnivoros = ["LEAO", "LEOPARDO", "CROCODILO"];

    if (carnivoros.includes(nome_animal)) {
      return this.analisaCarnivoros(nome_animal, quantidade);
    } else {
      const recintosViaveis = [];
      const animal = this.animais[nome_animal];

      let animal_diferente = 0;
      for (let recinto of this.recintos) {
        if (recinto.numero === 5) {
          continue;
        }
        if (animal_diferente === 0) {
          if (recinto.animais.length > 0) {
            if (recinto.animais[0].toUpperCase() !== nome_animal) {
              animal_diferente = 1;
            }
          }
        }
        let espacoOcupado = recinto.animais.reduce(
          (acc, animal) => acc + this.animais[animal.toUpperCase()].tamanho,
          0
        );
        let espacoDisponivel = recinto.tamanho - espacoOcupado;
        let biomasRecinto = recinto.bioma.split(" e ");
        //let espacoExtra = recinto.animais.length > 0 ? 0 : 1;

        if (
          espacoDisponivel >= animal.tamanho * quantidade &&
          animal.biomas.some((bioma) => biomasRecinto.includes(bioma))
        ) {
          if (
            nome_animal === "HIPOPOTAMO" &&
            (!biomasRecinto.includes("savana") ||
              !biomasRecinto.includes("rio"))
          ) {
            continue;
          }

          recintosViaveis.push(
            `Recinto ${recinto.numero} (espaço livre: ${
              espacoDisponivel - animal.tamanho * quantidade - animal_diferente
            } total: ${recinto.tamanho})`
          );
        }
      }

      if (recintosViaveis.length === 0) {
        return { erro: "Não há recinto viável" };
      }

      return {
        recintosViaveis: recintosViaveis.sort((a, b) => a.numero - b.numero),
      };
    }
  }
}

export { RecintosZoo as RecintosZoo };
