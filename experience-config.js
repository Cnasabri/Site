/* Owner-requested temporary brand choices, editable here.
   Only Miele is verified from the original equipment photograph. */
window.RESIDENCE_CONFIG = {
  contact: {phone:'09015388817',tel:'+989015388817',email:'info@kelvan.design'},
  plan: 'assets/unit-plan.png',
  products: {
    10: [
      {x:65,y:56,title:'Sculptural armchair',text:'Soft leather. A sculptural silhouette.',brand:'Lazzoni',temporary:true},
      {x:93,y:68,title:'Accent seating',text:'A composed accent within the living space.',brand:'Saloni',temporary:true},
      {x:41,y:49,title:'Dining chair',text:'Upholstered seating beside the panoramic windows.',brand:'Enza Home',temporary:true}
    ],
    28: [
      {x:70,y:55,title:'Integrated oven & microwave',text:'Precision appliances, seamlessly integrated.',brand:'Miele',temporary:false},
      {x:72,y:35,title:'Cabinetry finish',text:'Muted cabinetry and warm timber.',brand:'Norde',temporary:true},
      {x:85,y:68,title:'Island seating',text:'Tailored upholstery at the heart of the kitchen.',brand:'Fuga',temporary:true}
    ],
    34: [
      {x:43,y:57,title:'Upholstered bed',text:'A soft, tailored centrepiece.',brand:'Lazzoni',temporary:true},
      {x:80,y:58.5,title:'Bedroom chairs',text:'A quiet seating pair beside the windows.',brand:'Enza Home',temporary:true}
    ]
  },
  keyplans: {6:'entrance',8:'entrance',10:'living',11:'living',12:'living',13:'living',14:'living',15:'living',27:'kitchen',28:'kitchen',29:'kitchen',34:'master',35:'master',36:'master',37:'master',38:'master',39:'master',42:'master',43:'master',50:'guest',51:'guest',56:'children'},
  detailStories: [
    {chapter:'master-bedroom',start:46,items:[
      {title:'Quiet joinery.',text:'Warm timber, precise edges and integrated light.'},
      {title:'Sculpted light.',text:'Soft illumination brings depth to the stone palette.'},
      {title:'At your bedside.',text:'Everyday essentials, composed into one quiet detail.'},
      {title:'A softer touch.',text:'Tailored upholstery, texture and considered stitching.'}
    ]},
    {chapter:'guest-room',start:52,items:[
      {title:'Texture, up close.',text:'A tactile palette made for a welcoming retreat.'},
      {title:'Room to pause.',text:'An upholstered accent chair for quiet moments.'},
      {title:'Warmth in the grain.',text:'Timber and stone meet in a precise, simple finish.'},
      {title:'Finishing touches.',text:'Clean geometry and considered fittings complete the space.'}
    ]}
  ]
};
