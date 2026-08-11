from flask_sqlalchemy import SQLAlchemy # class provided by Flask-SQLAlchemy
db=SQLAlchemy() #object of sqlalchemy
import uuid #universal unique identifier
import datetime as dt
#db.Model → SQLAlchemy's base model class
class AccountDb(db.Model):
    __tablename__="accounts"
    account_id=db.Column(db.String(36),
     nullable=False, primary_key=True,
            default=lambda: str(uuid.uuid4()))
    owner_name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    #unique means no  duplication of emails
    password = db.Column(db.String(255), nullable=False)
    transactions=db.relationship("TransactionDb",backref="account", cascade="all, delete-orphan")
    #account.transactions
#to get all transactions belonging to the account.
#transaction.account
#to get the account that owns that transaction
    budgets=db.relationship("BudgetDb",backref="account", cascade="all, delete-orphan")
    goals=db.relationship("GoalDb",backref="account", cascade="all, delete-orphan")



#SQLAlchemy calls the function when it needs the default value.
class TransactionDb(db.Model):
    __tablename__="transactions" 
    #use text for large data and for short uyse string
    amount=db.Column(db.Float,nullable=False) 
    category=db.Column(db.String(80),nullable=False)
    transaction_type=db.Column(db.String(20),nullable=False)
    description=db.Column(db.Text,default="")
    trans_id=db.Column(db.String(36), primary_key=True,
    default=lambda: str(uuid.uuid4()))
    #primary key cannot be null
    #if not using function it will call immediately and every trasnaction will get the same deafult id(primary key no longer unique)
    date=db.Column(db.DateTime,nullable=False,
    default=dt.datetime.now )#NOT USING parenthesis here (noted)
    account_id=db.Column(db.String(36),db.ForeignKey("accounts.account_id"),nullable=False)



class BudgetDb(db.Model):
    __tablename__="budgets"
    category=db.Column(db.String(80),nullable=False)
    limit=db.Column(db.Float,nullable=False)
    month=db.Column(db.String(20),nullable=False)
    budget_id=db.Column(db.String(36), primary_key=True,
        default=lambda: str(uuid.uuid4()))

    account_id=db.Column(db.String(36),db.ForeignKey("accounts.account_id"),nullable=False)

class GoalDb(db.Model):
    __tablename__="goals"
    title = db.Column(db.String(120), nullable=False)
    target=db.Column(db.Float,nullable=False)
    saved=db.Column(db.Float,nullable=False)
    date=db.Column(db.DateTime,nullable=False,
          default=dt.datetime.now )
    goal_id=db.Column(db.String(36), primary_key=True,
            default=lambda: str(uuid.uuid4()))
    
    account_id=db.Column(db.String(36),db.ForeignKey("accounts.account_id"),nullable=False)
