
# strptime = string → datetime (parse a string into an object)
# strftime = datetime → string (format an object into a string)
import uuid #universal unique identifier
import datetime as  dt
import json

#json.dump  write json directly into file... write to disk 
#json.dumps giev the json string no need of  file .. write to memory
# json.load(f) — reads JSON from a file
# json.loads(s) — reads JSON from a string you already have in memory (no file involved)
#Transaction Class
class Transaction:
    def __init__(self,amount,category,transaction_type,description="",trans_id=None,date=None):
        if(trans_id is None ):
             self.trans_id =str(uuid.uuid4())
        else:
            self.trans_id=trans_id
        if( date is None): 
         self.date = dt.datetime.now()
        else:
             self.date=date   
        self.amount=amount
        self.category=category
        self.transaction_type = transaction_type
        self.description=description
    def __str__ (self):
     return f"Id : {self.trans_id}\nAmount : {self.amount}\nCategory : {self.category}\nDate : {self.date.strftime('%d/%m/%y %I:%M %p')}\nTransaction_type : {self.transaction_type}\nDescription : {self.description}\n"
    def to_dict(self):
       return {
         "trans_id":self.trans_id,
         "date" :self.date.strftime("%d/%m/%y %I:%M %p") ,
         "amount": self.amount,
         "category":self.category,
         "transaction_type":self.transaction_type,
         "description":self.description
       }

#Account Class
class Account:
   def __init__(self, owner_name):
      self.owner_name = owner_name
      self.transactions=[]
      self.balance=0
  
   def add_transaction(self,trans):
      if isinstance(trans,Transaction):#check even if it is subclass
         self.transactions.append(trans)
         if (trans.transaction_type.lower()=="income") :
            self.balance+=trans.amount
         else:
            self.balance-=trans.amount   
      else:
         raise TypeError("Object mismatched")

   def get_balance(self):
      return self.balance
   def get_transactions(self):
      return self.transactions
   
   def remove_transaction(self,id):
    for t  in self.transactions:
       if(t.trans_id==id):
          if(t.transaction_type=="income"):
             self.balance-= t.amount
          else:
             self.balance+=t.amount 
          self.transactions.remove(t)
          break
    else:
       raise ValueError("Id not found")

   def json_conversion (self):
       data_save=[s.to_dict() for s in self.get_transactions()]
       return data_save
   
   def save_to_file(self,filename):
           with open (filename,"w") as f:
             json.dump(self.json_conversion(),f,indent=4,skipkeys=True,ensure_ascii=False)
    
   def load_from_file(self,filename):
      with open (filename,"r") as f:
         load_data=json.load(f)
      for v in load_data :
        self.add_transaction( Transaction(v["amount"],v["category"],v["transaction_type"],v["description"],v["trans_id"],dt.datetime.strptime(v["date"],"%d/%m/%y %I:%M %p")))


 # json.loads convert json strings into python dictionaries
 # json.dumps convert python dictionaries into json strings
 # python internally/automatically do jsons.loads when data  comes from API   
 # to convert data into json convert into universal data types that json understands {dic,lists,strings,int,float}
      
      
obj1 = Transaction(500,"food","expense")
print(type(obj1.to_dict()))
acc=Account("nabila")
acc.add_transaction(obj1)
data=acc.json_conversion()
acc.save_to_file("transactions.json")
acc.load_from_file("transactions.json")





