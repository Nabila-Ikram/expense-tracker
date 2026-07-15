
# strptime = string → datetime (parse a string into an object)
# strftime = datetime → string (format an object into a string)
import uuid #universal unique identifier
import datetime as  dt
#Transaction Class
class Transaction:
    def __init__(self,amount,category,transaction_type,description=""):
        self.trans_id =str(uuid.uuid4())
        self.date = dt.datetime.now()
        self.amount=amount
        self.category=category
        self.transaction_type = transaction_type
        self.description=description
    def __str__ (self):
     return f"Id : {self.trans_id}\nAmount : {self.amount}\nCategory : {self.category}\nDate : {self.date.strftime('%d/%m/%y %I:%M %p')}\nTransaction_type : {self.transaction_type}\nDescription : {self.description}\n"

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

          
 # json.loads convert json strings into python dictionaries
 # json.dumps convert python dictionaries into json strings
 # python internally/automatically do jsons.loads when data  comes from API   
      
      
obj1 = Transaction(500,"food","expense")
print(obj1)#automatic runs string method 
acc=Account("nabila")
acc.add_transaction(obj1)
acc.remove_transaction(obj1.trans_id)
print(acc.get_transactions())




