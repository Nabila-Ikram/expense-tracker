from flask import Flask,request ,jsonify #class
from storage import search_acc,save_acc
from models import Account,Transaction
#post req cannot open through browser gives error
#GET → Ask for data
 #POST → Send data to the server
app= Flask(__name__) #obj
@app.route('/')
def home():
    return "Welcome to our expense tracker.."


#json.load()	File	Python object
# json.dump()	Python object	File
# request.get_json()	HTTP request	Python dictionary
# jsonify()	Python object	HTTP JSON response
@app.route('/account', methods=['POST'])
def create_acc():
    # Convert the Account object into a Python dictionary
  # jsonify() converts the dictionary into an HTTP JSON response
    data=request.get_json() #convert json in python dictionary (send data by react)
    account=search_acc("transactions.json",data["owner_name"])
    if account is None:
        account=Account(data["owner_name"])
        save_acc(account,"transactions.json")
    return jsonify(account.to_dict())#send data back to react


@app.route('/transactions',methods=['POST'])
def add_transaction():
    data=request.get_json()
    account=search_acc("transactions.json",data["owner_name"])
    if account is None:
        return jsonify({"error":"Account not found"}) ,404

    else:
        account.add_transaction(Transaction(data["amount"],
        data["category"],data["transaction_type"],
         data["description"]))
        save_acc(account,"transactions.json")
        return jsonify(account.to_dict() )
        

@app.route('/transactions/<owner_name>',methods=['GET'])
def get_transactions(owner_name):
    # no need of request.get_json() bcz no json data to read(as it is get req)
    account=search_acc("transactions.json",owner_name)
    if account is None:
        return jsonify({"error":"Account not found"}) ,404
    else:
     transactions=account.get_transactions()
     return jsonify([t.to_dict() for t in transactions])
    

@app.route("/accounts/<owner_name>/transactions/<trans_id>", methods=["DELETE"])
def delete_transaction(owner_name, trans_id):

    account = search_acc("transactions.json", owner_name)

    if account is None:
        return jsonify({"error": "Account not found"}), 404
    try:
     account.remove_transaction(trans_id)
     save_acc(account, "transactions.json")
     return jsonify(account.to_dict())
    except ValueError as e :
     return jsonify({"error": str(e)}), 404
    

if __name__ == '__main__': # for security (not if conditions means if other file imports then server starts)
    app.run(debug=True)    
