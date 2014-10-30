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
  :feature_subheader => 'Subheader Here',
  :feature_header => 'Header Here',
  :feature_text => 'Melody as patterns. Harmony as prints. Rhythm as stitching. Voice as statement. Menswear accessories as resonant as the songs that inspire them. The next strut of the peacock revolution.',
  :slideshow_images => [
    { :url => "http://image-proxy.bigcartel.biz/bigcartel-staging/theme_images/5616383/-/01638_darkknight_2560x1600.jpg" },
    { :url => "http://image-proxy.bigcartel.biz/bigcartel-staging/theme_images/5616386/-/01773_valleyforge_1920x1200.jpg" },
    { :url => "http://image-proxy.bigcartel.biz/bigcartel-staging/theme_images/5616389/-/01776_riverthameslondonuk_2560x1600.jpg" }
  ]
}

run Dugway.application(options)
