AFRAME.registerComponent('swap', {
    init: function() {
    var el = this.el;
    this.autoplay = function() {
      el.setAttribute('autoplay',"test");
      el.removeAttribute('swap');
      console.log(el);
      console.log(this.domucment)
    }
    this.manual = function() {
        el.setAttribute('chord-keys',"none");
        el.removeAttribute('swap');
    }
    this.controller = document.querySelector('#controller');
    this.controller.addEventListener('gripdown', this.autoplay);
    this.controller.addEventListener('triggerdown', this.manual);
  },
  remove: function() {
    this.controller.removeEventListener('gripdown', this.autoplay);
    this.controller.removeEventListener('triggerdown', this.manual);
  }
});