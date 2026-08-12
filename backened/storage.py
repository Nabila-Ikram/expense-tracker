from models import Account, Transaction,Budget,Goal
from db_models import AccountDb,TransactionDb,BudgetDb,GoalDb
from db_models import db
# import datetime as  dt
# import json
# def save_acc(acc,filename):
#   #takes two argument (data ..obj to save and file //json dump
#     try:
#       print("save_acc called")
#       with open (filename,"r") as f:
#        load_data=json.load(f)
#       for  (index,d)  in enumerate (load_data):
#         if(d["account_id"]==acc.account_id):
#            load_data[index]=acc.to_dict()
#            break
#       else:
#            load_data.append(acc.to_dict())
#       with open (filename,"w") as f:
#        json.dump(load_data,f,indent=4,skipkeys=True,ensure_ascii=False)            
           
#     except FileNotFoundError:
#      load_data=[]
#      load_data.append(acc.to_dict())
#      with open (filename,"w") as f:
#       json.dump(load_data,f,indent=4,skipkeys=True,ensure_ascii=False)



# converting
# Python Account
#       ↓
# AccountDb
#       ↓
# database representation
# def save_acc(acc):
#     # Try to find an existing row for this account
#     acc_row = AccountDb.query.filter_by(account_id=acc.account_id).first()

#     if acc_row is None:
#         # New account - create a fresh row
#         acc_row = AccountDb(
#             account_id=acc.account_id,
#             owner_name=acc.owner_name,
#             email=acc.email,
#             password=acc.password
#         )
#         db.session.add(acc_row)
#     else:
#         # Existing account - update its basic fields
#         acc_row.owner_name = acc.owner_name
#         acc_row.email = acc.email
#         acc_row.password = acc.password

#     # Simplest strategy: wipe out old children, re-add current ones from
#     # the Account object. This mirrors your old JSON approach, which also
#     # overwrote the whole account (including its transactions) each save.
#     TransactionDb.query.filter_by(account_id=acc.account_id).delete()
#     BudgetDb.query.filter_by(account_id=acc.account_id).delete()
#     GoalDb.query.filter_by(account_id=acc.account_id).delete()
#    #using sessiona nd commit bcz applying changes in daatabase
#     for t in acc.transactions:
#         db.session.add(TransactionDb(
#             trans_id=t.trans_id,
#             amount=t.amount,
#             category=t.category,
#             transaction_type=t.transaction_type,
#             description=t.description,
#             date=t.date,
#             account_id=acc.account_id
#         ))

#     for b in acc.budgets:
#         db.session.add(BudgetDb(
#             budget_id=b.budget_id,
#             category=b.category,
#             limit=b.limit,
#             month=b.month,
#             account_id=acc.account_id
#         ))

#     for g in acc.goals:
#         db.session.add(GoalDb(
#             goal_id=g.goal_id,
#             title=g.title,
#             target=g.target,
#             saved=g.saved,
#             date=g.date,
#             account_id=acc.account_id
#         ))

#     # Nothing is actually written to the .db file until commit() runs
#     db.session.commit()


 # json.loads convert json strings into python dictionaries
 # json.dumps convert python dictionaries into json strings
 # python internally/automatically do jsons.loads when data  comes from API   
 # to convert data into json convert into universal data types that json understands {dic,lists,strings,int,float}
# def search_acc(filename,email):
#  try:
#    with open (filename,"r") as f:
#     load_data=json.load(f)
#     for d in load_data:
#         if(d["email"]== email):
#            account=Account(d["owner_name"],
#            d["email"],d["password"], d["account_id"])
#            for t in d.get("transactions", []):
#             account.add_transaction(Transaction(t["amount"],
#             t["category"],t["transaction_type"],
#             t["description"],t["trans_id"],
#             dt.datetime.strptime(t["date"],"%d/%m/%y %I:%M %p")))
#            for b in d.get("budgets",[]): 
#               #get prevents key error if new key .. give empty array
#               account.add_budget(Budget(b["category"],b["limit"],b["month"],b["budget_id"]))

#            for g in d.get("goals",[]):
#                account.add_goal(Goal (g["title"],
#                g["target"],
#                g["saved"],
#                dt.datetime.strptime(g["date"],"%d/%m/%y %I:%M %p"),g["goal_id"]
#                ))
         
#            return account
        
#     else:   
#      return None
#  except FileNotFoundError :
#      return None





# converting
# database representation
#       ↓
# AccountDb
#       ↓
# Python Account
def search_acc(email):
 #finding account by email
 acc_row=AccountDb.query.filter_by(email=email).first()
 #filter_by(column=value)
 if acc_row is None:
        return None
#converrting acc row in accountObj
 account=Account(acc_row.owner_name,acc_row.email,acc_row.password,acc_row.account_id)


#acc-row.transactions is accesible bcz of relationship otherweisew we have to apply queriesa here
 for t in acc_row.transactions:
    account.add_transaction(Transaction(
            t.amount, t.category, t.transaction_type,
            t.description, t.trans_id, t.date
        ))
 for b in acc_row.budgets:  
    account.add_budget(Budget(b.category, b.limit, b.month, b.budget_id))
 for g in acc_row.goals:
        account.add_goal(Goal(g.title, g.target, g.saved, g.date, g.goal_id))
 return account
 


def save_acc(acc):

    try:
    
        acc_row = AccountDb.query.filter_by(
            account_id=acc.account_id
        ).first()

        if acc_row is None:
            acc_row = AccountDb(
                account_id=acc.account_id,
                owner_name=acc.owner_name,
                email=acc.email,
                password=acc.password
            )

            db.session.add(acc_row)

        else:
            acc_row.owner_name = acc.owner_name
            acc_row.email = acc.email
            acc_row.password = acc.password



        existing_transactions = {
            t.trans_id: t
            for t in acc_row.transactions #to get a python obj after applying query
        }
        #can track which transaction need to be removed
      
        current_transaction_ids = set() 

        for t in acc.transactions:

            current_transaction_ids.add(t.trans_id)

            if t.trans_id in existing_transactions:
             #if alraedy exit,update
                db_t = existing_transactions[t.trans_id]

                db_t.amount = t.amount
                db_t.category = t.category
                db_t.transaction_type = t.transaction_type
                db_t.description = t.description
                db_t.date = t.date

            else:
               #not exit,create
                db.session.add(
                    TransactionDb(
                        trans_id=t.trans_id,
                        amount=t.amount,
                        category=t.category,
                        transaction_type=t.transaction_type,
                        description=t.description,
                        date=t.date,
                        account_id=acc.account_id
                    )
                )


        # Delete transactions removed from Python object

        for trans_id, db_t in existing_transactions.items():

            if trans_id not in current_transaction_ids:
                db.session.delete(db_t)


      
        # BUDGETS
     

        existing_budgets = {
            b.budget_id: b
            for b in acc_row.budgets
        }

        current_budget_ids = set()

        for b in acc.budgets:

            current_budget_ids.add(b.budget_id)

            if b.budget_id in existing_budgets:

                db_b = existing_budgets[b.budget_id]

                db_b.category = b.category
                db_b.limit = b.limit
                db_b.month = b.month

            else:

                db.session.add(
                    BudgetDb(
                        budget_id=b.budget_id,
                        category=b.category,
                        limit=b.limit,
                        month=b.month,
                        account_id=acc.account_id
                    )
                )


        for budget_id, db_b in existing_budgets.items():

            if budget_id not in current_budget_ids:
                db.session.delete(db_b)


      
        # GOALS
       

        existing_goals = {
            g.goal_id: g
            for g in acc_row.goals
        }

        current_goal_ids = set()

        for g in acc.goals:

            current_goal_ids.add(g.goal_id)

            if g.goal_id in existing_goals:

                db_g = existing_goals[g.goal_id]

                db_g.title = g.title
                db_g.target = g.target
                db_g.saved = g.saved
                db_g.date = g.date

            else:

                db.session.add(
                    GoalDb(
                        goal_id=g.goal_id,
                        title=g.title,
                        target=g.target,
                        saved=g.saved,
                        date=g.date,
                        account_id=acc.account_id
                    )
                )


        for goal_id, db_g in existing_goals.items():

            if goal_id not in current_goal_ids:
                db.session.delete(db_g)


        # SAVE EVERYTHING
       
        db.session.commit()

    except Exception:
        db.session.rollback()
        raise

#  Session = CHANGE
#  Query=Read