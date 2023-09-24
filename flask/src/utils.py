
def profile_to_dict(user_data: dict) -> dict:
    nfts = user_data["nfts"]
    labels = user_data["labels"]
    user_data["nfts"] = {}
    user_data["labels"] = {}

    for i, nft in enumerate(nfts):
        user_data["nfts"][i] = nft
    
    for i, label in enumerate(labels):
        user_data["labels"][i] = label
    return user_data

def profile_to_list(user_data: dict) -> dict:
    nfts = []
    labels = []
    for nft in user_data["nfts"].values():
        nfts.append(nft)
    
    for label in user_data["labels"].values():
        labels.append(label)
    
    user_data["nfts"] = nfts
    user_data["labels"] = labels

    return user_data