from flask import Flask,request ,jsonify #class
# Allow React (different origin) to access Flask APIs
from flask_cors import CORS
import datetime as dt
from storage import search_acc,save_acc
from models import Account,Transaction,Budget
from werkzeug.security import generate_password_hash,check_password_hash
#post req cannot open through browser gives error
#GET → Ask for data
 #POST → Send data to the server
app= Flask(__name__) #obj
CORS(app)
   
@app.route('/')
def home():
    return "Welcome to our expense tracker.."
#Login endpoint
@app.route('/login',methods=['POST'])
def login():
    data=request.get_json()
    account=search_acc("transactions.json",data["email"])
    if account is None:
      return jsonify({"error":"Account not found"}) ,404
    if check_password_hash(account.password, data["password"]):
       return jsonify(account.to_dict_public()),200
    else:
        return jsonify({"error":"Incorrect password"}) ,401
    #401 means incorrect information entered


#json.load()	File	Python object
# json.dump()	Python object	File
# request.get_json()	HTTP request	Python dictionary
# jsonify()	Python object	HTTP JSON response

#singup endpoint
@app.route('/account', methods=['POST'])
def create_acc():
    
    # Convert the Account object into a Python dictionary
  # jsonify() converts the dictionary into an HTTP JSON response
    data=request.get_json() #convert json in python dictionary (send data by react)
    account=search_acc("transactions.json",data["email"])
    if account is not None:
        return jsonify({"error":"Email  already exists"}),409
        #409 code means conflict

    hashed_password=generate_password_hash(data["password"])
    account=Account(data["owner_name"],data["email"],hashed_password)
    save_acc(account,"transactions.json")
    return jsonify(account.to_dict_public()),201 #send data back to react
    #201 means account created succesfully

#adding trasaction endpoint
@app.route('/transactions',methods=['POST'])
def add_transaction():

    data=request.get_json()
    account=search_acc("transactions.json",data["email"])
    
    selected_date = dt.datetime.strptime(data["date"], "%Y-%m-%d")
    amount = float(data["amount"])
    if account is None:
        return jsonify({"error":"Account not found"}) ,404
    try:
     account.add_transaction(Transaction(
        amount,data["category"],
        data["transaction_type"],
        data["description"],
        date=selected_date) )
        # // otherwise set in trans_id
     save_acc(account,"transactions.json")
     return jsonify(account.to_dict_public()),200
    #200 means ok (successfully)
    except ValueError as e:
       return jsonify({"error":str(e)}) ,400
       
        
#displaying all transactions endpoint
@app.route('/transactions/<email>',methods=['GET'])
def get_transactions(email):
    # no need of request.get_json() bcz no json data to read(as it is get req)
    account=search_acc("transactions.json",email)
    if account is None:
        return jsonify({"error":"Account not found"}) ,404
    
    transactions=account.get_transactions()
    return jsonify([t.to_dict() for t in transactions]),200   


@app.route('/budget/<email>',methods=['POST'])
def add_budgets(email):
     data=request.get_json()
     account=search_acc("transactions.json",email)
     if account is None:
             return jsonify({"error":"Account not found"}) ,404
     try:
         account.add_budget(Budget(data["category"],data["limit"],data["month"]))
         save_acc(account,"transactions.json")
         budget=account.get_budgets()
         return jsonify([b.to_dict() for b in budget]),200   
     except ValueError as e:
            return jsonify({"error":str(e)}) ,400    
   

#removing transaction endpoint
@app.route("/accounts/<email>/transactions/<trans_id>", methods=["DELETE"])
def delete_transaction(email, trans_id):

    account = search_acc("transactions.json",email)

    if account is None:
        return jsonify({"error": "Account not found"}), 404
    try:
     account.remove_transaction(trans_id)
     save_acc(account, "transactions.json")
     return jsonify(account.to_dict_public()),200
    except ValueError as e :
     return jsonify({"error": str(e)}), 404
    

if __name__ == '__main__': # for security (not if conditions means if other file imports then server starts)
    app.run(debug=True,port=5000)    
