const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
module: {
rules: [
{
test: /\.css|\.scss$/,
use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
},
{ 
test: /\.ttf|\.png$/, 
use: "file-loader" 
} 
]
},
plugins: [
new HtmlWebPackPlugin({
template: "./src/index.html",
filename: "./index.html"
}),
new MiniCssExtractPlugin({
filename: "[name].css"
})
]
};