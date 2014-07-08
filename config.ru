require 'dugway'

options = {}

# Use data from any store to make sure your theme looks great with all sorts of products, pages,
# categories, and more. Just give us the subdomain. Default is "dugway" for dugway.bigcartel.com.
options[:store] = 'knotbytiffa'

# Simulate the customization done by store owners by passing values to different variables.
# Default values are based on the "default" for each setting in your settings.json.
options[:customization] = {
  :logo => {
    :url => 'http://placehold.it/200x44/000000/ffffff&text=My+Logo',
    :width => 200,
    :height => 44
  },
  :link_hover => 'blue',
  :show_search => true,
  :twitter_username => 'knotbytiffa',
  :feature_subheader => 'Summer 2014',
  :feature_text => 'Melody as patterns. Harmony as prints. Rhythm as stitching. Voice as statement. Menswear accessories as resonant as the songs that inspire them. The next strut of the peacock revolution.'
}

run Dugway.application(options)
