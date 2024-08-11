import uvicorn
from App.app import app
from App.Config.db_config import engine, Base, db, get_db
# from App.Models import *
from dummy_data import and_dummy_data







if __name__ == "__main__":
    try:
        Base.metadata.create_all(bind = engine)
        # and_dummy_data(db=get_db())
        pass
    except Exception as e:
        print('error', e)
    uvicorn.run('App.app:app', reload=True, host="localhost", port=5049)