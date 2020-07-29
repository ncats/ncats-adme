import pickle
from keras.models import load_model
from keras_self_attention import SeqSelfAttention
from chemprop.utils import load_checkpoint, load_scalers

def init():
    global dnn_model
    with open('./models/dnn_morgan_all_data.pkl', 'rb') as pkl_file:
        dnn_model = pickle.load(pkl_file)

    global tokenizer
    with open("./models/tokenizer.pickle",'rb') as tokfile:
        tokenizer = pickle.load(tokfile)

    global lstm_model
    lstm_model = load_model("./models/lstm_all_data.h5", custom_objects=SeqSelfAttention.get_custom_objects())

    global gcnn_scaler, gcnn_features_scaler
    gcnn_scaler, gcnn_features_scaler = load_scalers('./models/gcnn_model.pt')

    global gcnn_model
    gcnn_model = load_checkpoint('./models/gcnn_model.pt')