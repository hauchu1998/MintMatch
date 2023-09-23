from typing import List, Tuple
from queue import PriorityQueue
import requests


label_map = {
    "Art": 0,
    "Game": 1,
    "Tech": 2,
    "Cute": 3,
    "Sports": 4,
    "Animals": 5,
    "Music": 6,
}


def map_labels(labels: List[str]) -> List[int]:
    mapped_lst = [0] * len(label_map)

    for label in labels:
        label_ind = label_map[label]
        mapped_lst[label_ind] = 1

    return mapped_lst


# Returns [(useraddress, [mappings])]
# users with their labels mapped to 0 or 1
def getUsers(user_profiles) -> List[Tuple]:
    users = []
    for user in user_profiles["profiles"]:
        user_address = user_profiles["profiles"][user]["address"]
        user_labels = user_profiles["profiles"][user]["labels"]

        mapped_user_labels = map_labels(user_labels)
        users.append((user_address, mapped_user_labels))

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
    while not priority_queue.empty():  # to list
        item = priority_queue.get()
        matches_users.append(item[1])

    return matches_users[::-1]  # rev order


def getProfiles(addresses: List[str], user_profiles: dict) -> List[dict]:
    profiles = []
    for address in addresses:
        profile = user_profiles["profiles"][address]
        profiles.append(profile)

    return profiles


def main():
    user = ("useraddress", [1, 1, 1, 1, 0, 0, 0])  # example user to match

    request = requests.get("https://43b5-208-123-173-93.ngrok-free.app/profile/all")
    user_profiles = request.json()

    users = getUsers(user_profiles)
    ordered_addresses = findMatches(user, users)

    profiles = getProfiles(ordered_addresses, user_profiles)

    return profiles


main()
