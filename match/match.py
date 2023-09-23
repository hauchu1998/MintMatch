from typing import List
import heapq

def findMatches(user_profiles: List[List[int]]) -> List[int]:
  priority_queue = []

  for user in user_profiles:
    priority_rank = -1 * sum(user)
    heapq.heappush(priority_queue,((priority_rank, user)))

  matched_users = [user for _, user in priority_queue]
  return matched_users

users = [[1,0,1],[0,0,1],[1,1,1]]
p = findMatches(users)
print(p)
