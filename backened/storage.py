from models import Account, Transaction
import datetime as  dt
import json
def save_acc(acc,filename):
  #takes two argument (data ..obj to save and file //json dump
    try:
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
def search_acc(filename,acc_owner):
 try:
   with open (filename,"r") as f:
    load_data=json.load(f)
    for d in load_data:
        if(d["owner_name"]== acc_owner):
           account=Account(d["owner_name"],d["account_id"])
           for t in d["transactions"] :
            account.add_transaction(Transaction(t["amount"],
            t["category"],t["transaction_type"],
            t["description"],t["trans_id"],
            dt.datetime.strptime(t["date"],"%d/%m/%y %I:%M %p")))
           return account
        
    else:   
     
     return None
 except FileNotFoundError :
     return None