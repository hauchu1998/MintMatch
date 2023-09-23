from typing import List, Tuple
from queue import PriorityQueue
import requests

#Call main(address) with the address of the user who you want matches for
#Returns matches in order of similarity (ranked by labels)

#Fixed mapping to represent each label
label_map = {
    "Art": 0,
    "Game": 1,
    "Tech": 2,
    "Cute": 3,
    "Sports": 4,
    "Animals": 5,
    "Music": 6,
}


#returns a list representing whether or not (1 or 0) a label is in the list 
def mapLabels(labels: List[str]) -> List[int]:
    mapped_lst = [0] * len(label_map)

    for label in labels:
        label_ind = label_map[label]
        mapped_lst[label_ind] = 1

    return mapped_lst


# Returns [(useraddress, [mappings])]
# users with their labels mapped to 0 or 1
def getUsers(user_profiles: dict) -> List[Tuple]:
    users = []
    for user in user_profiles["profiles"]:
        try:
          user_address = user_profiles["profiles"][user]["address"]
          user_labels = user_profiles["profiles"][user]["labels"]

          mapped_user_labels = mapLabels(user_labels)
          users.append((user_address, mapped_user_labels))

        except KeyError as e:
            print(f"User does not exist!: {e}")
            continue 

    return users


# Returns ranked matches of [userAdresses]
def findMatches(user_to_match: List, user_profiles: List[Tuple]) -> List[int]:
    priority_queue = PriorityQueue()

    for address, user in user_profiles:
        priority_rank = 0
        for label1, label2 in zip(user_to_match[1], user):
            priority_rank += label1 * label2
            if label1 != label2:  # penalize difference
                priority_rank -= 1

        priority_queue.put((priority_rank, address, user))

    matches_users = []
    while not priority_queue.empty():# to list
        item = priority_queue.get()
        matches_users.append(item[1])

    return matches_users[::-1] # rev order


#Returns a list of user profiles in the same order as the given input addresses
def getProfiles(addresses: List[str], user_profiles: dict) -> List[dict]:
    profiles = []
    for address in addresses:
        profile = user_profiles["profiles"][address]
        profiles.append(profile)

    return profiles


#Returns the mapped labels for a single user
#input: address (string)
#output: mapped labels (list[int])
def getLabels(address: str, user_profiles: dict) -> List[int]:
    try:
      user_profile = user_profiles['profiles'][address]
      user_labels = user_profile['labels']
      return mapLabels(user_labels)
    except KeyError as e:
        print(f"User does not exist!: {e}")
        return []
        

def main(user_address: str) -> List[dict]:

    request = requests.get("https://43b5-208-123-173-93.ngrok-free.app/profile/all") #get all users
    user_profiles = request.json()

    user_labels = getLabels(user_address, user_profiles) #get labels for the user to match

    if not user_labels:
        print("No labels found for the user.")
        return []
        
    user_to_match = (user_address, user_labels) #get mapped labels for user to match

    all_users = getUsers(user_profiles) #map user's labels so they can be compared
    ordered_addresses = findMatches(user_to_match, all_users) #get rank of user addresses based on their labels

    profiles = getProfiles(ordered_addresses, user_profiles) #conver ordered addresses into ordered profiles

    return profiles

# print(main("0x123"))
