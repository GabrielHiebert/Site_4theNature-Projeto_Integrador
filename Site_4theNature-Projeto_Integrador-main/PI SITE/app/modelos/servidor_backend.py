from config import * 
from perfil import Perfil 
 
@app.route("/") 
def inicio(): 
   return 'Sistema de cadastro de usuarios. '+\
         '<a href="/listar_usuarios">Operação listar</a>'

@app.route("/listar_usuarios") 
def listar_usuarios(): 
   # obter os ususários do cadastro 
   usuarios = db.session.query(Perfil).all() 
   # aplicar o método json que a classe Perfil possui a cada elemento da lista 
   usuarios_em_json = [ x.json() for x in usuarios ] 
   # converter a lista do python para json 
   resposta = jsonify(usuarios_em_json)
   #permitir resposta para outros pedidos oriundos de outras tecnologias
   resposta.headers.add("Access-Control-Allow-Origin", "*")
   return resposta #retornar...

@app.route("/incluir_usuario", methods=['post'])
def incluir_usuario():
   #preparar uma resposta otimista
   resposta = jsonify({"resultado": "ok","detalhes": "ok"})
   #receber as informações da nova pessoa
   dados = request.get_json() #(force=True) dipensa Content-Tpe na requisição
   try: #tentar executar operação
      nova = Perfil(**dados) #criar a nova pessoa
      db.session.add(nova) #adicionar no banco de dados
      db.session.commit() #Efetivar a operação de gravação
   except Exception as e: #em caso de erro...
      #Informar mensagem de erro
      resposta = jsonify({"resultado": "erro", "detalhes": str(e)})
   #Adicionar cabeçalho de liberação de origem
   resposta.headers.add("Access-Control-Allow-Origin", "*")
   return resposta #responder!



app.run(debug=True) 
