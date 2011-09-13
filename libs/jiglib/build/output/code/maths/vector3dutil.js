(function(a){var b=function(){throw new Error("Vector3DUtil is a utility class and should not be instantiated");};b.X_AXIS=[1,0,0,0];b.Y_AXIS=[0,1,0,0];b.Z_AXIS=[0,0,1,0];b.add=function(g,e){return[g[0]+e[0],g[1]+e[1],g[2]+e[2],g[3]+e[3]];};b.subtract=function(g,e){return[g[0]-e[0],g[1]-e[1],g[2]-e[2],g[3]-e[3]];};b.decrementBy=function(g,e){g[0]-=e[0];g[1]-=e[1];g[2]-=e[2];g[3]-=e[3];};b.IncrementBy=function(g,e){g[0]+=e[0];g[1]+=e[1];g[2]+=e[2];g[3]+=e[3];};b.distance=function(l,j){var h=Math;var g=h.pow;var e=g(l[0]-j[0],2);var k=g(l[1]-j[1],2);var i=g(l[2]-j[2],2);return h.sqrt(e+k+i);};b.dotProduct=function(g,e){return g[0]*e[0]+g[1]*e[1]+g[2]*e[2];};b.crossProduct=function(g,e){return[g[1]*e[2]-g[2]*e[1],g[2]*e[0]-g[0]*e[2],g[0]*e[1]-g[1]*e[0],0];};b.get_length=function(e){var g=e[0]*e[0]+e[1]*e[1]+e[2]*e[2];return(g>0)?Math.pow(g,0.5):0;};b.get_lengthSquared=function(e){var g=e[0]*e[0]+e[1]*e[1]+e[2]*e[2];return g;};b.normalize=function(e){f=b.get_length(e);e[0]/=f;e[1]/=f;e[2]/=f;return f;};b.negate=function(e){e[0]*=-1;e[1]*=-1;e[2]*=-1;return e;};b.scaleBy=function(e,g){e[0]*=g;e[1]*=g;e[2]*=g;};b.getSum=function(g){var e=Math.abs;return e(g[0])+e(g[1])+e(g[2]);};b.limitSum=function(g,h){var e=Math.abs;c=b.getSum(g);if(h>=c){return;}f=h/c;b.scaleBy(g,f);};b.project=function(e){e[0]/=e[3];e[1]/=e[3];e[2]/=e[3];e[3]=1;};b.angleBetween=function(i,g){var h=i.slice(0);var e=g.slice(0);b.normalize(h);b.normalize(e);d=b.dotProduct(h,e);if(d<-1){d=-1;}else{if(d>1){d=1;}}return Math.acos(d);};b.equals=function(h,g,e){if(!e){return(h[0]==g[0]&&h[1]==g[1]&&h[2]==g[2]);}else{return(h[0]==g[0]&&h[1]==g[1]&&h[2]==g[2]&&h[3]==g[3]);}};b.create=function(e,j,i,g){var h=[];h[0]=(e)?e:0;h[1]=(j)?j:0;h[2]=(i)?i:0;h[3]=(g)?g:0;return h;};a.Vector3DUtil=b;})(jigLib);