
# strptime = string → datetime (parse a string into an object)
# strftime = datetime → string (format an object into a string)
import uuid #universal unique identifier
import datetime as  dt
class Transaction:
    def __init__(self,amount,category,transaction_type,description=""):
        self.trans_id =str(uuid.uuid4())
        self.date = dt.datetime.now()
        self.amount=amount
        self.category=category
        self.transaction_type=transaction_type
        self.description=description
    def __str__ (self):
     return f"Id : {self.trans_id}\nAmount : {self.amount}\nCategory : {self.category}\nDate : {self.date.strftime('%d/%m/%y %I:%M %p')}\nTransaction_type : {self.transaction_type}\nDescription : {self.description}\n"
obj1=Transaction(500,"food","expense")
str=obj1.__str__()
print(type(str))


