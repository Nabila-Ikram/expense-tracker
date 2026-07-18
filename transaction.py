
# strptime = string → datetime (parse a string into an object)
# strftime = datetime → string (format an object into a string)
import uuid #universal unique identifier
import datetime as  dt
import json

#json.dump  write json directly into file... write to disk 
#json.dumps gives the json string no need of  file .. write to memory
# json.load(f) — reads JSON from a file
# json.loads(s) — reads JSON from a string you already have in memory (no file involved)
#Transaction Class
class Transaction:
    def __init__(self,amount,category,transaction_type,description="",trans_id=None,date=None):
        if amount is None or amount <= 0:
            raise ValueError("Amount is required and must be positive")
        
        if not category or not isinstance(category, str):
            raise ValueError("Category is required and must be a string")
        
        if not transaction_type or transaction_type.lower() not in ["income", "expense"]:
            raise ValueError("Transaction type must be 'income' or 'expense'")   
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
   def __init__(self, owner_name,account_id=None):
      if(account_id is None):
         self.account_id=str(uuid.uuid4())
      else:
         self.account_id=account_id   
      self.owner_name = owner_name
      self.transactions=[]
      self.balance=0
  
   def add_transaction(self,trans):
      if isinstance(trans,Transaction):#check even if it is subclass
         self.transactions.append(trans)
         if (trans.transaction_type.lower()=="income") :
            self.balance+=trans.amount
         elif trans.transaction_type.lower()=="expense" :
            self.balance-=trans.amount   
      else:
         raise TypeError("Object mismatched")

   def get_balance(self):
      return self.balance
   def get_transactions(self):
      return sorted(self.transactions,key= lambda t:t.date)
   
   def remove_transaction(self,id):
    for t  in self.transactions:
       if(t.trans_id==id):
          if(t.transaction_type.lower()=="income"):
             self.balance-= t.amount
          else:
             self.balance+=t.amount 
          self.transactions.remove(t)
          break
    else:
       raise ValueError("Id not found")

   def to_dict(self):
      return {
         "owner_name":self.owner_name,
          "account_id":self.account_id,
          "transactions":[s.to_dict() for s in self.get_transactions()]

      }    
   def save_to_file(self,filename):
  #takes two argument (data ..obj to save and file //json dump
    try:
      with open (filename,"r") as f:
       load_data=json.load(f)
      for  (index,d)  in enumerate (load_data):
        if(d["account_id"]==self.account_id):
           load_data[index]=self.to_dict()
           break
      else:
           load_data.append(self.to_dict())
      with open (filename,"w") as f:
       json.dump(load_data,f,indent=4,skipkeys=True,ensure_ascii=False)            
           
    except FileNotFoundError:
     load_data=[]
     load_data.append(self.to_dict())
     with open (filename,"w") as f:
      json.dump(load_data,f,indent=4,skipkeys=True,ensure_ascii=False)

 # json.loads convert json strings into python dictionaries
 # json.dumps convert python dictionaries into json strings
 # python internally/automatically do jsons.loads when data  comes from API   
 # to convert data into json convert into universal data types that json understands {dic,lists,strings,int,float}
acc_owner=input("Enter Account holder name :")  
def Search_from_file(filename,acc_owner):
 try:
   with open (filename,"r") as f:
    load_data=json.load(f)
    print(load_data)
    for d in load_data:
        if(d["owner_name"]== acc_owner):
           newacc=Account(d["owner_name"],d["account_id"])
           for t in d["transactions"] :
            newacc.add_transaction(Transaction(t["amount"],
            t["category"],t["transaction_type"],
            t["description"],t["trans_id"],
            dt.datetime.strptime(t["date"],"%d/%m/%y %I:%M %p")))
           return newacc
        
    else:   
     newacc=Account(acc_owner)
     return newacc
 except FileNotFoundError:
     newacc=Account(acc_owner)
     return newacc
  

acc=Search_from_file("transactions.json" ,acc_owner)
choices = [1,2,3,4,5]   
       
while True:
    try:
        print("""
1. Add Transaction
2. View All Transactions
3. Delete Transaction
4. View Balance
5. Exit
""")
        user_choice = int(input("Enter your choice: "))

        if user_choice not in choices:
            raise ValueError("Not a valid choice")

        if user_choice == 5:
            acc.save_to_file("transactions.json")
            break
      
        print("You chose", user_choice)
        if(user_choice==1):
         try:
           amount=int(input("Enter amount : "))
           category=input("Enter Category : ")
           transaction_type=input("Enter transaction-type : ")
           description=input("Enter description : ") 
           acc.add_transaction(Transaction(amount,category,transaction_type,description))
         except ValueError as e:
            print(e)  
        elif(user_choice==2):
          for t in acc.get_transactions():
             print(t) #triggers str function for better formatting
              
        elif(user_choice==3):    
           for t in acc.get_transactions():
             print(t)
           Trans_id=input("Enter  Enter Transaction_id  you want to delete :")
           try:
              acc.remove_transaction(Trans_id)
           except ValueError as e:
              print(e)       
        elif(user_choice==4):
         print(f"Balance is :   {acc.get_balance()}")
    except ValueError as e:
        print(e)





