# web-peticoes
Api para cadastro de assinatura de petições

URL DA HOSPEDAGEM DO SISTEMA:

ROTAS DO SISTEMA:

BUSCA TODAS AS PETIÇÕES: (GET) /api/peticoes <br>
BUSCA PETIÇÕES POR ID: (GET) /api/peticoes/:id <br>
AUTENTICAÇÃO DO USUÁRIO: (POST) /api/auth <br>
  KEY DO HEADER: x-access-token <br>
{<br>
     "email": "maria@gmail.com",<br>
     "pass": "maria123"<br>
}<br>
 INSERE NOVA PETIÇÃO (NESCESSITA ESTAR AUTENTICADO): (POST) /api/peticoes<br>
  KEY DO HEADER: x-access-token<br>
{<br>
    "titulo": "Mais ônibus para o IFSP",<br>
    "descricao": "Incluir mais rotas de ônibus que acessem o IFSP"<br>
}<br>
 EDITA PETIÇÃO (NESCESSITA ESTAR AUTENTICADO): (PUT) /api/peticoes/:id<br>
  KEY DO HEADER: x-access-token<br>
{<br>
    "titulo": "Mais ônibus para o IFSP Campinas",<br>
    "descricao": "Incluir mais rotas de ônibus que acessem o IFSP"<br>
} <br>
 ASSINAR PETIÇÃO (NESCESSITA ESTAR AUTENTICADO): (POST) /api/sign/:id<br>
  KEY DO HEADER: x-access-token<br>
 REMOVER ASSINATURA DA PETIÇÃO (NESCESSITA ESTAR AUTENTICADO): (DELETE) /api/sign/:id<br>
  KEY DO HEADER: x-access-token<br>
 DELETAR PETIÇÃO (NESCESSITA ESTAR AUTENTICADO): (DELETE) /api/peticoes/:id<br>
  HEADER: x-access-token<br>
