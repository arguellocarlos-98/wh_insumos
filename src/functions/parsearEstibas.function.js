export const parsearEstibas = (estibas) => {
    if (!estibas) return [];
    return estibas.split(",").map((item) => {
        const [Estiba, Cantidad] = item.split("$");
        return {
            Estiba,
            Cantidad: parseFloat(Cantidad),
        };
    });
};