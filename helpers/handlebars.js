module.exports = {
    abu: function (str){return 'Allaahu Akbar!' + str;},
    isNotStories(pageTitle, options) {
      if(pageTitle !== 'Stories') 
        return options.fn(this);
      return options.inverse(this);
      },
    isNotCreateStories(pageTitle, options) {
      if(pageTitle !== 'Create story') 
        return options.fn(this);
      return options.inverse(this);
      },
    capitalizeEach(options) {
      const {name, sex} = options.hash;
      return name.replace(/<.*?>/i, 'UPPER');
      return name.toUpperCase();
      return 'my first name is ' + first;
      
      if(sex === 'male') return 'You are a male';
      return name.split(/\s+/)
      .map(e => e.slice(0,1).toUpperCase() + e.slice(1))
      .join(' ');
    },
};