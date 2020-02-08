from PIL import Image, ImageEnhance, ImageFilter
import cv2
import pytesseract
pytesseract.pytesseract.tesseract_cmd = r'/usr/local/Cellar/tesseract/4.1.1/bin/tesseract'

img = Image.open("test.jpg")

text=pytesseract.image_to_string(img)
print(text)

