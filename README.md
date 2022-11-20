# web-peticoes
Api para cadastro de assinatura de petições

URL DA HOSPEDAGEM DO SISTEMA:

ROTAS DO SISTEMA:

> BUSCA TODAS AS PETIÇÕES: (GET) /api/peticoes
> BUSCA PETIÇÕES POR ID: (GET) /api/peticoes/:id
> AUTENTICAÇÃO DO USUÁRIO: (POST) /api/auth
  KEY DO HEADER: x-access-token
{
     "email": "maria@gmail.com",
     "pass": "maria123"
}
> INSERE NOVA PETIÇÃO (NESCESSITA ESTAR AUTENTICADO): (POST) /api/peticoes
  KEY DO HEADER: x-access-token
{
    "titulo": "Mais ônibus para o IFSP",
    "descricao": "Incluir mais rotas de ônibus que acessem o IFSP"
} 
> EDITA PETIÇÃO (NESCESSITA ESTAR AUTENTICADO): (PUT) /api/peticoes/:id
  KEY DO HEADER: x-access-token
{
    "titulo": "Mais ônibus para o IFSP Campinas",
    "descricao": "Incluir mais rotas de ônibus que acessem o IFSP"
} 
> ASSINAR PETIÇÃO (NESCESSITA ESTAR AUTENTICADO): (POST) /api/sign/:id
  KEY DO HEADER: x-access-token
> REMOVER ASSINATURA DA PETIÇÃO (NESCESSITA ESTAR AUTENTICADO): (DELETE) /api/sign/:id
  KEY DO HEADER: x-access-token
> DELETAR PETIÇÃO (NESCESSITA ESTAR AUTENTICADO): (DELETE) /api/peticoes/:id
  HEADER: x-access-token




