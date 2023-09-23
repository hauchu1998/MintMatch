from typing import List
from queue import PriorityQueue

def findMatches(user_to_match: List, user_profiles: List[List[int]]) -> List[int]:
  priority_queue = PriorityQueue()

  for user in user_profiles:
    priority_rank = 0
    for label1, label2 in zip(user_to_match, user):
      priority_rank += label1 * label2 
      if label1 != label2: #penalize difference
        priority_rank -= 1

    priority_queue.put((priority_rank, user))

  matches_users = []
  while not priority_queue.empty(): #to list
    matches_users.append(priority_queue.get()[1])
  return matches_users[::-1] #rev order
  

# user = [0,0,1]
# users = [[1,0,1],[0,0,1],[1,1,1],[0,0,0],[1,1,1],[0,1,1],[0,1,0]]
# p = findMatches(user, users)
# print(p)