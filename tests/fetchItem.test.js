require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  test('1 - Teste se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  
  test('2 - Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada', async () =>{
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  
  test('3 - Teste se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint', async () =>{
    const call = "https://api.mercadolibre.com/items/MLB1615760527";
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(call);
  });

  test('4 - Teste se o retorno de fetchItem com o argumento do item "MLB1615760527" é uma estrutura igual ao objeto item que já está importado no arquivo.', async () =>{
    const expected = await fetchItem('MLB1615760527');
    expect(expected).toEqual(item);
  });
  
  test('Teste se, ao chamar a função fetchItem sem argumento, retorna um erro:', () => {
    expect(fetchItem()).rejects.toThrowError(new Error('You must provide an url'));
  });

});
