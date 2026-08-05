from models import Account, Transaction,Budget,Goal
import datetime as  dt
import json
def save_acc(acc,filename):
  #takes two argument (data ..obj to save and file //json dump
    try:
      print("save_acc called")
      with open (filename,"r") as f:
       load_data=json.load(f)
      for  (index,d)  in enumerate (load_data):
        if(d["account_id"]==acc.account_id):
           load_data[index]=acc.to_dict()
           break
      else:
           load_data.append(acc.to_dict())
      with open (filename,"w") as f:
       json.dump(load_data,f,indent=4,skipkeys=True,ensure_ascii=False)            
           
    except FileNotFoundError:
     load_data=[]
     load_data.append(acc.to_dict())
     with open (filename,"w") as f:
      json.dump(load_data,f,indent=4,skipkeys=True,ensure_ascii=False)

 # json.loads convert json strings into python dictionaries
 # json.dumps convert python dictionaries into json strings
 # python internally/automatically do jsons.loads when data  comes from API   
 # to convert data into json convert into universal data types that json understands {dic,lists,strings,int,float}
def search_acc(filename,email):
 try:
   with open (filename,"r") as f:
    load_data=json.load(f)
    for d in load_data:
        if(d["email"]== email):
           account=Account(d["owner_name"],
           d["email"],d["password"], d["account_id"])
           for t in d.get("transactions", []):
            account.add_transaction(Transaction(t["amount"],
            t["category"],t["transaction_type"],
            t["description"],t["trans_id"],
            dt.datetime.strptime(t["date"],"%d/%m/%y %I:%M %p")))
           for b in d.get("budgets",[]): 
              #get prevents key error if new key .. give empty array
              account.add_budget(Budget(b["category"],b["limit"],b["month"],b["budget_id"]))

           for g in d.get("goals",[]):
               account.add_goal(Goal (g["title"],
               g["target"],
               g["saved"],
               dt.datetime.strptime(g["date"],"%d/%m/%y %I:%M %p"),g["goal_id"]
               ))
         
           return account
        
    else:   
     return None
 except FileNotFoundError :
     return None


 