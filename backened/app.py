from flask import Flask,request ,jsonify #class
from db_models import db , AccountDb
# Allow React (different origin) to access Flask APIs
from flask_cors import CORS
import datetime as dt
from storage import search_acc,save_acc
from models import Account,Transaction,Budget,Goal
from dotenv import load_dotenv
import os

from werkzeug.security import generate_password_hash,check_password_hash
#post req cannot open through browser gives error
#GET → Ask for data
 #POST → Send data to the server
app= Flask(__name__) #obj


# Render's Postgres URLs start with "postgres://" but SQLAlchemy needs "postgresql://"
load_dotenv()


database_url = os.environ.get("DATABASE_URL", "sqlite:///finance.db")

if database_url.startswith("postgres://"):
    database_url = database_url.replace("postgres://", "postgresql://", 1)

app.config["SQLALCHEMY_DATABASE_URI"] = database_url
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


#The 1 means replace only the first occurrence.
# Environment variables store configuration values outside the source code.
# os.environ.get("DATABASE_URL") reads the DATABASE_URL from the environment.
# This allows different settings for local and production environments
# without changing the Python code.
# Example:
# Local → SQLite database
# Production → PostgreSQL database

db.init_app(app)

with app.app_context():
    db.create_all()
CORS(app, origins='*')
   
@app.route('/')
def home():
    return "Welcome to our expense tracker.."
#Login endpoint
@app.route('/login',methods=['POST'])
def login():
    data=request.get_json()
    account=search_acc(data["email"])
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
    account=search_acc(data["email"])
    if account is not None:
        return jsonify({"error":"Email  already exists"}),409
        #409 code means conflict

    hashed_password=generate_password_hash(data["password"])
    account=Account(data["owner_name"],data["email"],hashed_password)
    save_acc(account)
    return jsonify(account.to_dict_public()),201 #send data back to react
    #201 means account created succesfully

#adding trasaction endpoint
@app.route('/transactions',methods=['POST'])
def add_transaction():

    data=request.get_json()
    account=search_acc(data["email"])
    
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
     save_acc(account)
     return jsonify(account.to_dict_public()),200
    #200 means ok (successfully)
    except ValueError as e:
       return jsonify({"error":str(e)}) ,400
       
        
#displaying all transactions endpoint
@app.route('/transactions/<email>',methods=['GET'])
def get_transactions(email):
    # no need of request.get_json() bcz no json data to read(as it is get req)
    account=search_acc(email)
    if account is None:
        return jsonify({"error":"Account not found"}) ,404
    
    transactions=account.get_transactions()
    return jsonify([t.to_dict() for t in transactions]),200  


#getting profile route
@app.route('/profile/<email>',methods=['GET'])
def get_profile(email):
      account=search_acc(email)
      if account is None:
       return jsonify({"error":"Account not found"}) ,404
      return jsonify({"owner_name": account.owner_name,
    "email": account.email,
    "account_id": account.account_id}),200


#changing password
@app.route("/change-password/<email>", methods=["PUT"])
def change_password(email):

    account = AccountDb.query.filter_by(email=email).first()

    if account is None:
        return jsonify({"error": "Account not found"}), 404

    data = request.get_json()

    current_password = data.get("currentPassword")
    new_password = data.get("newPassword")

    if not current_password or not new_password:
        return jsonify({"error": "All fields are required"}), 400

    # Check old password
    if not check_password_hash(account.password, current_password):
        return jsonify({"error": "Current password is incorrect"}), 401

    # Hash new password
    account.password = generate_password_hash(new_password)

    db.session.commit()

    return jsonify({"message": "Password changed successfully"}), 200


















#buget add
@app.route('/budget',methods=['POST'])
def add_budgets():
     data=request.get_json()
     account=search_acc(data["email"])
     if account is None:
             return jsonify({"error":"Account not found"}) ,404
     try:
         limit = float(data["limit"])
         budget=Budget(data["category"],limit,data["month"])
         account.add_budget(budget)
         save_acc(account)
         return jsonify(budget.to_dict()),201   
     except ValueError as e:
            return jsonify({"error":str(e)}) ,400 


#add goal
@app.route('/goals',methods=['POST'])
def add_goals():
      data=request.get_json()
      account=search_acc(data["email"])
      if account is None:
       return jsonify({"error":"Account not found"}) ,404
      try:
          target=float(data["target"])
          saved=float(data["saved"])
          selected_date = dt.datetime.strptime(data["date"], "%Y-%m-%d")
          
          goal=(Goal(data["title"],
          target,saved,
          selected_date))
          account.add_goal(goal)
          save_acc(account)
          return jsonify(goal.to_dict()),201   
      except ValueError as e:
                  return jsonify({"error":str(e)}) ,400     



#getting goals
@app.route('/goals/<email>',methods=['GET'])
def get_goals(email):  
    account=search_acc(email)
    if account is None:
                 return jsonify({"error":"Account not found"}) ,404
    
    goals=account.get_goals()
    return jsonify([g.to_dict() for g in goals]),200


#getting budgets
@app.route('/budget/<email>',methods=['GET'])
def get_budget(email):  
    account=search_acc(email)
    if account is None:
                 return jsonify({"error":"Account not found"}) ,404
    
    budgets=account.get_budgets()
    return jsonify([b.to_dict() for b in budgets]),200



      
# POST /budget/<email>   → Add a new budget (201)

# GET  /budget/<email>   → Retrieve all budgets (200)

#removing transaction endpoint
@app.route("/accounts/<email>/transactions/<trans_id>", methods=["DELETE"])
def delete_transaction(email, trans_id):

    account = search_acc(email)

    if account is None:
        return jsonify({"error": "Account not found"}), 404
    try:
     account.remove_transaction(trans_id)
     save_acc(account)
     return jsonify(account.to_dict_public()),200
    except ValueError as e :
     return jsonify({"error": str(e)}), 404



#deleting budget    
@app.route("/accounts/<email>/budgets/<budget_id>", methods=["DELETE"])    
def delete_budget(email,budget_id):
      account = search_acc(email)
     
      if account is None:
            return jsonify({"error": "Account not found"}), 404
      try:
          account.remove_budget(budget_id)
          save_acc(account)
          return jsonify(account.to_dict_public()),200
      except ValueError as e :
          return jsonify({"error": str(e)}), 404



#deleting goal
@app.route("/accounts/<email>/goals/<goal_id>", methods=["DELETE"])    
def delete_goal(email,goal_id):
      account = search_acc(email)
     
      if account is None:
            return jsonify({"error": "Account not found"}), 404
      try:
          account.remove_goal(goal_id)
          save_acc(account)
          return jsonify(account.to_dict_public()),200
      except ValueError as e :
          return jsonify({"error": str(e)}), 404
      
     


#updating transaction 
@app.route("/accounts/<email>/transactions/<trans_id>", methods=["PUT"])
def update_transaction(email,trans_id):
     account = search_acc(email)

     if account is None:
                 return jsonify({"error": "Account not found"}), 404
     try:
            data=request.get_json()
            if not data:
               return jsonify({"error": "No data provided"}), 400
            account.update_transaction(trans_id,data)
            save_acc(account)
            return jsonify(account.to_dict_public()),200
     except ValueError as e:
        return jsonify({"error": str(e)}), 404

#finding transaction by id
@app.route("/accounts/<email>/transactions/<trans_id>", methods=["GET"])
def get_transaction(email, trans_id):
     account = search_acc(email)
     
     if account is None:
        return jsonify({"error": "Account not found"}), 404
     for t in account.transactions:
       if t.trans_id == trans_id:
        return jsonify(t.to_dict()), 200
     return jsonify({"error": "Transaction not found"}), 404  







#updating budget
@app.route("/accounts/<email>/budget/<budget_id>", methods=["PUT"])
def update_budget(email,budget_id):
     account = search_acc(email)

     if account is None:
                 return jsonify({"error": "Account not found"}), 404
     try:
            data=request.get_json()
            if not data:
              return jsonify({"error": "No data provided"}), 400
            account.update_budget(budget_id,data)
            save_acc(account)
            return jsonify(account.to_dict_public()),200
     except ValueError as e:
        return jsonify({"error": str(e)}), 404



#finding budget by id
@app.route("/accounts/<email>/budget/<budget_id>", methods=["GET"])
def get_budget_by_ID(email, budget_id):
     account = search_acc(email)
     
     if account is None:
        return jsonify({"error": "Account not found"}), 404
     for b in account.budgets:
       if b.budget_id == budget_id:
        return jsonify(b.to_dict()), 200
     return jsonify({"error": "Budget not found"}), 404  




#update goals
@app.route("/accounts/<email>/goals/<goal_id>", methods=["PUT"])
def update_goal(email,goal_id):
     account = search_acc(email)

     if account is None:
                 return jsonify({"error": "Account not found"}), 404
     try:
            data=request.get_json()
            if not data:
             return jsonify({"error": "No data provided"}), 400
            account.update_goal(goal_id,data)
            save_acc(account)
            return jsonify(account.to_dict_public()),200
     except ValueError as e:
        return jsonify({"error": str(e)}), 404     



#finding goal by id
@app.route("/accounts/<email>/goals/<goal_id>", methods=["GET"])
def get_goal(email, goal_id):
     account = search_acc(email)
     
     if account is None:
        return jsonify({"error": "Account not found"}), 404
     for g in account.goals:
       if g.goal_id == goal_id:
        return jsonify(g.to_dict()), 200
     return jsonify({"error": "Goal  not found"}), 404       
     




     

     

if __name__ == '__main__': # for security (not if conditions means if other file imports then server starts)
   app.run(host="0.0.0.0", port=5000, debug=False)
