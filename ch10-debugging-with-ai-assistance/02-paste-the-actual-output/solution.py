# Lesson 10-2 solution (Python): the page count rounds up, so the partial last page is shown.

items = [1, 2, 3, 4, 5, 6, 7]
page_size = 3
page_count = -(-len(items) // page_size)  # rounds up
shown = 0
for page in range(page_count):
    piece = items[page * page_size:(page + 1) * page_size]
    shown += len(piece)
    print(f"page {page}: {' '.join(str(x) for x in piece)}")
print(f"total shown: {shown} of {len(items)}")
