REST API: Representational State transfer Application programming interface 

=> convention pour la creation des web services. Ensemble de regles et de bonne pratiques
=> ressources (etudiants, notes, matieres...)
=> stateless => independance (request)

// regles (CRUD)

-1 create:
method: POST 
url: /ressouces => /etudiants
data: sous format(xml ou json) dans le body de la requete
=> POST /etudiants  body:{"id":1,"name":"mehdi}

response : status code 201
le serveur renvoie le meme objet insere (xml ou json)

2- Read (all):
method: GET
url: /ressouces => /etudiants
data: pas de data

response : status code 200
le serveur renvoie la liste des objets (xml ou json)

3- Read (all with criteria):
method: GET
url: /ressouces => /etudiants
data des criteria: query param
data: pas de data
 exemple: GET /etudiants?limit=10&order=asc
response : status code 200
le serveur renvoie la liste des objets (xml ou json)

4- Read (1 ressource with id)
method: GET
url: /ressouces => /etudiants
data : id de la ressource (path param)
exemple: GET /etudiants/cd234
response : status code 200 || 404
le serveur renvoie un objet (xml ou json) ou 404 not found

5- update (PUT ou PATCH)
// PUT pour modifier tout l objet et patch pour une modification partielle
method : PUT ou PATCH
url: /ressouces => /etudiants
data : id de la ressource (path param) et data a modifier (body de la requete)
response : status code 200 || 404
le serveur renvoie un objet (xml ou json) ou 404 not found

6- delete
method : DELETE
url: /ressouces => /etudiants
data : id de la ressource (path param) 
response : status code 200 || 404
le serveur renvoie un objet vide (xml ou json) ou 404 not found

exercice : users ( id , nom , prenom , age) => web service (REST)




==> deux techniques:
XMLHttpRequest (vanilla js)
fetch(node js et vanilla js) => promise