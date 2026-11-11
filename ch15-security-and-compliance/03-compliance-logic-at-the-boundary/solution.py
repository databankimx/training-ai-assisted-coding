# Lesson 15-3 solution (Python): the boundary follows the rule. Only records older than 90 days are deleted.


def decide(age_days):
    return "deleted" if age_days > 90 else "kept"


records = [(1, 30), (2, 90), (3, 91), (4, 400)]
for record_id, age_days in records:
    print(f"record {record_id} ({age_days} days): {decide(age_days)}")

deleted = sum(1 for _, age_days in records if decide(age_days) == "deleted")
print(f"retention job: deleted {deleted} of {len(records)}")
