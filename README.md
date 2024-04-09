```markdown:README.md
# img-compress Image Compression and Responsiveness

This project is designed to compress images located in the `src/img` directory, make them responsive, and output the processed images to the `dist/img` directory using Webpack.

## Getting Started

To utilize this project for image compression and responsiveness, follow the steps below:

### Prerequisites

Ensure you have Node.js installed on your system. You can download it from the [Node.js official website](https://nodejs.org/).

### Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the necessary dependencies by running:

```bash
npm install
```

### Compressing and Making Images Responsive

To process your images, simply place them in the `src/img` directory and run the following command:

```bash
npm run build
```

This command triggers the `build` script defined in `package.json`, which in turn utilizes Webpack and its configured plugins to compress the images, make them responsive, and output them to the `dist/img` directory.

### Configuration Details

- **Compression**: Handled by the `image-webpack-loader` in the Webpack configuration. You can adjust the compression settings in the `webpack.config.js` file to meet your specific needs.
- **Responsiveness**: Achieved using the `responsive-loader` in conjunction with `sharp` for high-quality image transformations. The loader is configured to generate images of different sizes (as specified), which can be used to serve different image sizes for different device resolutions, improving loading times and bandwidth usage.

### Notes

- Ensure that the `src/img` and `dist/img` directories exist. If not, you may need to create them manually or adjust the Webpack configuration accordingly.
- The `responsive-loader` is configured to output images in the JPEG format by default, with a specified size of 800px width. You can modify this setting in the `webpack.config.js` file to include additional sizes or change the output format.
- For more detailed configuration options or troubleshooting, refer to the documentation of the individual plugins used in the `webpack.config.js` file, specifically `image-webpack-loader` and `responsive-loader`.

This setup provides a streamlined process for preparing images for web use, ensuring they are both size-optimized and responsive for various devices.