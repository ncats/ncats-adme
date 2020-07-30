def init():
    global columns_dict
    columns_dict = {
        'RF': { 'order': 1, 'description': 'random forest', 'isSmilesColumn': False },
        'DNN': { 'order': 2, 'description': 'deep neural network', 'isSmilesColumn': False },
        'LSTM': { 'order': 3, 'description': 'long-short term memory', 'isSmilesColumn': False },
        'GCNN': { 'order': 4, 'description': 'graph convolutional neural network', 'isSmilesColumn': False },
        'Consensus': { 'order': 5, 'description': 'consensus of all four models', 'isSmilesColumn': False },
        'Prediction': { 'order': 6, 'description': 'class label predicted by consensus model', 'isSmilesColumn': False }
    }