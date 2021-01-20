
  var gclient_ext_inherits = function(child,parent) {
    if(!parent || !child) return;
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
  };
 
  /* IE Polyfill */
  // NodeList.forEach
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }
  // Element.remove
  if (window.Element && !Element.prototype.remove) {
    Element.prototype.remove = function() {
      if (this.parentNode) this.parentNode.removeChild(this);
    }
  }
  /* End Polyfill */
  
  export {gclient_ext_inherits}
  export default gclient_ext_inherits
  