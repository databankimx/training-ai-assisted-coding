# Lesson 10-2 starter (Python): a paging helper that drops the last partial page.
# Run it, copy the output exactly, then compare it with the expected output. Don't fix anything yet.

items = [1, 2, 3, 4, 5, 6, 7]
page_size = 3
page_count = len(items) // page_size  # bug: integer division drops the partial last page
shown = 0
for page in range(page_count):
    piece = items[page * page_size:(page + 1) * page_size]
    shown += len(piece)
    print(f"page {page}: {' '.join(str(x) for x in piece)}")
print(f"total shown: {shown} of {len(items)}")
