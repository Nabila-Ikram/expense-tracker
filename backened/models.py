import uuid #universal unique identifier
import datetime as  dt
# transaction class
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
          "iso_date": self.date.strftime("%Y-%m-%d"), 
         "amount": self.amount,
         "category":self.category,
         "transaction_type":self.transaction_type,
         "description":self.description,
       }

class Budget:
   def __init__(self,category,limit,month):
      if not category:
          raise ValueError("Category required")

      if limit <= 0:
          raise ValueError("Budget limit must be positive")
      
      self.category = category
      self.limit = limit
      self.month = month

   def to_dict(self):
       return {
           "category": self.category,
           "limit": self.limit,
           "month": self.month
       }  
 # Account class
class Account:
   def __init__(self, owner_name,email,password,account_id=None):
      if(account_id is None):
         self.account_id=str(uuid.uuid4())
      else:
         self.account_id=account_id   
      self.owner_name = owner_name
      self.transactions=[]
      self.budgets=[]
      self.balance=0
      self.email=email
      self.password=password
  
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
   def get_budgets(self):
      return self.budgets

   
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
          "email":self.email,
          "account_id":self.account_id,
          "transactions":[s.to_dict() for s in self.get_transactions()],
         "budgets":[b.to_dict() for b in self.budgets],
          "password":self.password
      }    
   def to_dict_public(self):
         return {
            "owner_name":self.owner_name,
             "email":self.email,
             "account_id":self.account_id,
             "transactions":[s.to_dict() for s in self.get_transactions()],
              "budgets":[b.to_dict() for b in self.budgets]
      # not adding password for the purpose of security
      #not sending credentials(passsword) to react
         }



   def add_budget(self,budget):
       if isinstance(budget,Budget):
          self.budgets.append(budget)
       else:
         raise TypeError("Object mismatched")




      