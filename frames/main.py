import cv2
vidcap = cv2.VideoCapture("./video.mp4")
fps = int(vidcap.get(cv2.CAP_PROP_FPS))
# print(fps)
success,image = vidcap.read()
count = 0
while success:
  cv2.imwrite("./f/%d.jpg" % count, image)
  success,image = vidcap.read()
  count += 1
print(count)