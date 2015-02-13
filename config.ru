require 'dugway'

options = {}

# Use data from any store to make sure your theme looks great with all sorts of products, pages,
# categories, and more. Just give us the subdomain. Default is "dugway" for dugway.bigcartel.com.
# options[:store] = 'mystore'

# Simulate the customization done by store owners by passing values to different variables.
# Default values are based on the "default" for each setting in your settings.json.
options[:customization] = {
  :collections => true,
  :show_search => true,
  :twitter_link => 'knotbytiffa',
  :tumblr_link => 'knotbytiffa',
  :facebook_link => 'knotbytiffa',
  :instagram_link => 'knotbytiffa',
  :feature_subheader => 'Subheader Here',
  :feature_header => 'Header Here',
  :feature_text => 'Melody as patterns. Harmony as prints. Rhythm as stitching. Voice as statement. Menswear accessories as resonant as the songs that inspire them. The next strut of the peacock revolution.',
  :slideshow_images => [
    { :url => "http://images.bigcartel.biz/bigcartel-staging/theme_images/155/-/snow-forest.jpg" },
    { :url => "http://nicinabox.com/superslides/images/floor-kid.jpg" }
  ]
}

run Dugway.application(options)
