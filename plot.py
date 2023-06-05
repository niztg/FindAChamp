# Create a new "figure" or canvas that is 10 inches by 10 inches
plt.figure(figsize=(10,10))

# Loop through first 20 images
for i in range(20):
    plt.subplot(5,4,i+1)
    # Remove x and y axes labels
    plt.xticks([])
    plt.yticks([])
    
    # Hide grid lines
    plt.grid(False)

    # Displays the data as a 2d image and use a gray colorscheme
    plt.imshow(images[i], cmap=plt.cm.binary)

    # Add the type of clothes the image is under the x-axis
    plt.xlabel(mushroom_types[labels[i]])

# Displays all images
plt.show()