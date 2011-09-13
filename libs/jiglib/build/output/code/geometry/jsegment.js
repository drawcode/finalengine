(function(a){var d=a.Vector3DUtil;var b=a.JNumber3D;var c=a.JRay;var e=function(g,f){this.origin=g;this.delta=f;};e.prototype.origin=null;e.prototype.delta=null;e.prototype.getPoint=function(f){return d.add(this.origin,b.getScaleVector(this.delta,f));};e.prototype.getEnd=function(){return d.add(this.origin,this.delta);};e.prototype.clone=function(){return new e(this.origin,this.delta);};e.prototype.segmentSegmentDistanceSq=function(j,k){j.t0=0;j.t1=0;var r=d.subtract(this.origin,k.origin);var o=d.get_lengthSquared(this.delta);var n=-d.dotProduct(this.delta,k.delta);var i=d.get_lengthSquared(k.delta);var h=d.dotProduct(r,this.delta);var m=d.get_lengthSquared(r);var t=Math.abs(o*i-n*n);var g;var s;var q;var l;var p;if(t>=b.NUM_TINY){g=-d.dotProduct(r,k.delta);s=n*g-i*h;q=n*h-o*g;if(s>=0){if(s<=t){if(q>=0){if(q<=t){var f=1/t;s*=f;q*=f;l=s*(o*s+n*q+2*h)+q*(n*s+i*q+2*g)+m;}else{q=1;p=n+h;if(p>=0){s=0;l=i+2*g+m;}else{if(-p>=o){s=1;l=o+i+m+2*(g+p);}else{s=-p/o;l=p*s+i+2*g+m;}}}}else{q=0;if(h>=0){s=0;l=m;}else{if(-h>=o){s=1;l=o+2*h+m;}else{s=-h/o;l=h*s+m;}}}}else{if(q>=0){if(q<=t){s=1;p=n+g;if(p>=0){q=0;l=o+2*h+m;}else{if(-p>=i){q=1;l=o+i+m+2*(h+p);}else{q=-p/i;l=p*q+o+2*h+m;}}}else{p=n+h;if(-p<=o){q=1;if(p>=0){s=0;l=i+2*g+m;}else{s=-p/o;l=p*s+i+2*g+m;}}else{s=1;p=n+g;if(p>=0){q=0;l=o+2*h+m;}else{if(-p>=i){q=1;l=o+i+m+2*(h+p);}else{q=-p/i;l=p*q+o+2*h+m;}}}}}else{if(-h<o){q=0;if(h>=0){s=0;l=m;}else{s=-h/o;l=h*s+m;}}else{s=1;p=n+g;if(p>=0){q=0;l=o+2*h+m;}else{if(-p>=i){q=1;l=o+i+m+2*(h+p);}else{q=-p/i;l=p*q+o+2*h+m;}}}}}}else{if(q>=0){if(q<=t){s=0;if(g>=0){q=0;l=m;}else{if(-g>=i){q=1;l=i+2*g+m;}else{q=-g/i;l=g*q+m;}}}else{p=n+h;if(p<0){q=1;if(-p>=o){s=1;l=o+i+m+2*(g+p);}else{s=-p/o;l=p*s+i+2*g+m;}}else{s=0;if(g>=0){q=0;l=m;}else{if(-g>=i){q=1;l=i+2*g+m;}else{q=-g/i;l=g*q+m;}}}}}else{if(h<0){q=0;if(-h>=o){s=1;l=o+2*h+m;}else{s=-h/o;l=h*s+m;}}else{s=0;if(g>=0){q=0;l=m;}else{if(-g>=i){q=1;l=i+2*g+m;}else{q=-g/i;l=g*q+m;}}}}}}else{if(n>0){if(h>=0){s=0;q=0;l=m;}else{if(-h<=o){s=-h/o;q=0;l=h*s+m;}else{g=-d.dotProduct(r,k.delta);s=1;p=o+h;if(-p>=n){q=1;l=o+i+m+2*(n+h+g);}else{q=-p/n;l=o+2*h+m+q*(i*q+2*(n+g));}}}}else{if(-h>=o){s=1;q=0;l=o+2*h+m;}else{if(h<=0){s=-h/o;q=0;l=h*s+m;}else{g=-d.dotProduct(r,k.delta);s=0;if(h>=-n){q=1;l=i+2*g+m;}else{q=-h/n;l=m+q*(2*g+i*q);}}}}}j.t0=s;j.t1=q;return Math.abs(l);};e.prototype.pointSegmentDistanceSq=function(g,h){g.t=0;var j=d.subtract(h,this.origin);var i=d.dotProduct(j,this.delta);if(i<=0){i=0;}else{var f=d.get_lengthSquared(this._delta);if(i>=f){i=1;j=d.subtract(j,this._delta);}else{i/=f;j=d.subtract(j,b.getScaleVector(this._delta,i));}}g.t=i;return d.get_lengthSquared(j);};e.prototype.segmentBoxDistanceSq=function(g,f,k){g.pfLParam=0;g.pfLParam0=0;g.pfLParam1=0;g.pfLParam2=0;var j={};var i=new c(this.origin,this.delta);var h=this.sqrDistanceLine(j,i,f,k);if(j.num>=0){if(j.num<=1){g.pfLParam=j.num;g.pfLParam0=j.num0;g.pfLParam1=j.num1;g.pfLParam2=j.num2;return Math.max(h,0);}else{h=this.sqrDistancePoint(g,d.add(this.origin,this.delta),f,k);g.pfLParam=1;return Math.max(h,0);}}else{h=this.sqrDistancePoint(g,this.origin,f,k);g.pfLParam=0;return Math.max(h,0);}};e.prototype.sqrDistanceLine=function(l,s,q,o){var h=o.getOrientationCols();l.num=0;l.num0=0;l.num1=0;l.num2=0;var r=d.subtract(s.origin,o.position);var f=d.create(d.dotProduct(r,h[0]),d.dotProduct(r,h[1]),d.dotProduct(r,h[2]),0);var k=d.create(d.dotProduct(s.dir,h[0]),d.dotProduct(s.dir,h[1]),d.dotProduct(s.dir,h[2]),0);var j=f.slice(0);var p=k.slice(0);var g=[1,1,1,0];for(var n=0;n<3;n++){if(p[n]<0){j[n]=-j[n];p[n]=-p[n];g[n]=true;}else{g[n]=false;}}b.copyFromArray(f,j);b.copyFromArray(k,p);var m={};m.rkPnt=f.slice(0);m.pfLParam=0;m.rfSqrDistance=0;if(k[0]>0){if(k[1]>0){if(k[2]>0){this.caseNoZeros(m,k,q);l.num=m.pfLParam;}else{this.case0(m,0,1,2,k,q);l.num=m.pfLParam;}}else{if(k[2]>0){this.case0(m,0,2,1,k,q);l.num=m.pfLParam;}else{this.case00(m,0,1,2,k,q);l.num=m.pfLParam;}}}else{if(k[1]>0){if(k[2]>0){this.case0(m,1,2,0,k,q);l.num=m.pfLParam;}else{this.case00(m,1,0,2,k,q);l.num=m.pfLParam;}}else{if(k[2]>0){this.case00(m,2,0,1,k,q);l.num=m.pfLParam;}else{this.case000(m,q);l.num=0;}}}j=m.rkPnt.slice(0);for(n=0;n<3;n++){if(g[n]){j[n]=-j[n];}}b.copyFromArray(m.rkPnt,j);l.num0=m.rkPnt[0];l.num1=m.rkPnt[1];l.num2=m.rkPnt[2];return Math.max(m.rfSqrDistance,0);};e.prototype.sqrDistancePoint=function(h,g,k,i){var m=i.getOrientationCols();var n=d.subtract(g,i.position);var j=d.create(d.dotProduct(n,m[0]),d.dotProduct(n,m[1]),d.dotProduct(n,m[2]),0);var f=0;var o;var l=k.getHalfSideLengths();if(j[0]<-l[0]){o=j[0]+l[0];f+=(o*o);j[0]=-l[0];}else{if(j[0]>l[0]){o=j[0]-l[0];f+=(o*o);j[0]=l[0];}}if(j[1]<-l[1]){o=j[1]+l[1];f+=(o*o);j[1]=-l[1];}else{if(j[1]>l[1]){o=j[1]-l[1];f+=(o*o);j[1]=l[1];}}if(j[2]<-l[2]){o=j[2]+l[2];f+=(o*o);j[2]=-l[2];}else{if(j[2]>l[2]){o=j[2]-l[2];f+=(o*o);j[2]=l[2];}}h.pfLParam0=j[0];h.pfLParam1=j[1];h.pfLParam2=j[2];return Math.max(f,0);};e.prototype.face=function(w,t,s,r,j,f,h){var x=[0,0,0,0];var k;var o;var m;var g;var y;var q;var v=f.getHalfSideLengths();var u=v;var i=w.rkPnt;var l=j;var n=x;var p=h;n[s]=i[s]+u[s];n[r]=i[r]+u[r];b.copyFromArray(h,n);if(l[t]*n[s]>=l[s]*p[t]){if(l[t]*n[r]>=l[r]*p[t]){i[t]=u[t];o=1/l[t];i[s]-=(l[s]*p[t]*o);i[r]-=(l[r]*p[t]*o);w.pfLParam=-p[t]*o;b.copyFromArray(w.rkPnt,i);}else{k=l[t]*l[t]+l[r]*l[r];m=k*n[s]-l[s]*(l[t]*p[t]+l[r]*n[r]);if(m<=2*k*u[s]){y=m/k;k+=(l[s]*l[s]);m=n[s]-y;q=l[t]*p[t]+l[s]*m+l[r]*n[r];g=-q/k;w.rfSqrDistance+=(p[t]*p[t]+m*m+n[r]*n[r]+q*g);w.pfLParam=g;i[t]=u[t];i[s]=y-u[s];i[r]=-u[r];b.copyFromArray(w.rkPnt,i);}else{k+=(l[s]*l[s]);q=l[t]*p[t]+l[s]*p[s]+l[r]*n[r];g=-q/k;w.rfSqrDistance+=(p[t]*p[t]+p[s]*p[s]+n[r]*n[r]+q*g);w.pfLParam=g;i[t]=u[t];i[s]=u[s];i[r]=-u[r];b.copyFromArray(w.rkPnt,i);}}}else{if(l[t]*n[r]>=l[r]*p[t]){k=l[t]*l[t]+l[s]*l[s];m=k*n[r]-l[r]*(l[t]*p[t]+l[s]*n[s]);if(m<=2*k*u[r]){y=m/k;k+=(l[r]*l[r]);m=n[r]-y;q=l[t]*p[t]+l[s]*n[s]+l[r]*m;g=-q/k;w.rfSqrDistance+=(p[t]*p[t]+n[s]*n[s]+m*m+q*g);w.pfLParam=g;i[t]=u[t];i[s]=-u[s];i[r]=y-u[r];b.copyFromArray(w.rkPnt,i);}else{k+=(l[r]*l[r]);q=l[t]*p[t]+l[s]*n[s]+l[r]*p[r];g=-q/k;w.rfSqrDistance+=(p[t]*p[t]+n[s]*n[s]+p[r]*p[r]+q*g);w.pfLParam=g;i[t]=u[t];i[s]=-u[s];i[r]=u[r];b.copyFromArray(w.rkPnt,i);}}else{k=l[t]*l[t]+l[r]*l[r];m=k*n[s]-l[s]*(l[t]*p[t]+l[r]*n[r]);if(m>=0){if(m<=2*k*u[s]){y=m/k;k+=(l[s]*l[s]);m=n[s]-y;q=l[t]*p[t]+l[s]*m+l[r]*n[r];g=-q/k;w.rfSqrDistance+=(p[t]*p[t]+m*m+n[r]*n[r]+q*g);w.pfLParam=g;i[t]=u[t];i[s]=y-u[s];i[r]=-u[r];b.copyFromArray(w.rkPnt,i);}else{k+=(l[s]*l[s]);q=l[t]*p[t]+l[s]*p[s]+l[r]*n[r];g=-q/k;w.rfSqrDistance+=(p[t]*p[t]+p[s]*p[s]+n[r]*n[r]+q*g);w.pfLParam=g;i[t]=u[t];i[s]=u[s];i[r]=-u[r];b.copyFromArray(w.rkPnt,i);}return;}k=l[t]*l[t]+l[s]*l[s];m=k*n[r]-l[r]*(l[t]*p[t]+l[s]*n[s]);if(m>=0){if(m<=2*k*u[r]){y=m/k;k+=(l[r]*l[r]);m=n[r]-y;q=l[t]*p[t]+l[s]*n[s]+l[r]*m;g=-q/k;w.rfSqrDistance+=(p[t]*p[t]+n[s]*n[s]+m*m+q*g);w.pfLParam=g;i[t]=u[t];i[s]=-u[s];i[r]=y-u[r];b.copyFromArray(w.rkPnt,i);}else{k+=(l[r]*l[r]);q=l[t]*p[t]+l[s]*n[s]+l[r]*p[r];g=-q/k;w.rfSqrDistance+=(p[t]*p[t]+n[s]*n[s]+p[r]*p[r]+q*g);w.pfLParam=g;i[t]=u[t];i[s]=-u[s];i[r]=u[r];b.copyFromArray(w.rkPnt,i);}return;}k+=(l[r]*l[r]);q=l[t]*p[t]+l[s]*n[s]+l[r]*n[r];g=-q/k;w.rfSqrDistance+=(p[t]*p[t]+n[s]*n[s]+n[r]*n[r]+q*g);w.pfLParam=g;i[t]=u[t];i[s]=-u[s];i[r]=-u[r];b.copyFromArray(w.rkPnt,i);}}};e.prototype.caseNoZeros=function(i,k,o){var p=o.getHalfSideLengths();var l=d.create(i.rkPnt[0]-p[0],i.rkPnt[1]-p[1],i.rkPnt[2]-p[2],0);var g=k[0]*l[1];var j=k[1]*l[0];var n;var f;var m;var h;if(j>=g){n=k[2]*l[0];f=k[0]*l[2];if(n>=f){this.face(i,0,1,2,k,o,l);}else{this.face(i,2,0,1,k,o,l);}}else{m=k[2]*l[1];h=k[1]*l[2];if(m>=h){this.face(i,1,2,0,k,o,l);}else{this.face(i,2,0,1,k,o,l);}}};e.prototype.case0=function(x,u,t,s,i,f){var w=f.getHalfSideLengths();var v=w.slice(0);var h=x.rkPnt.slice(0);var m=i.slice(0);var q=h[u]-v[u];var p=h[t]-v[t];var j=m[t]*q;var g=m[u]*p;var r;var n;var o;if(j>=g){h[u]=v[u];var k=h[t]+v[t];r=j-m[u]*k;if(r>=0){n=1/(m[u]*m[u]+m[t]*m[t]);x.rfSqrDistance+=(r*r*n);h[t]=-v[t];x.pfLParam=-(m[u]*q+m[t]*k)*n;}else{o=1/m[u];h[t]-=(j*o);x.pfLParam=-q*o;}b.copyFromArray(x.rkPnt,h);}else{h[t]=v[t];var l=h[u]+v[u];r=g-m[t]*l;if(r>=0){n=1/(m[u]*m[u]+m[t]*m[t]);x.rfSqrDistance+=(r*r*n);h[u]=-v[u];x.pfLParam=-(m[u]*l+m[t]*p)*n;}else{o=1/m[t];h[u]-=(g*o);x.pfLParam=-p*o;}b.copyFromArray(x.rkPnt,h);}if(h[s]<-v[s]){r=h[s]+v[s];x.rfSqrDistance+=(r*r);h[s]=-v[s];}else{if(h[s]>v[s]){r=h[s]-v[s];x.rfSqrDistance+=(r*r);h[s]=v[s];}}b.copyFromArray(x.rkPnt,h);};e.prototype.case00=function(j,i,h,g,k,m){var o=0;var n=m.getHalfSideLengths();var f=n.slice(0);var l=j.rkPnt.slice(0);var p=k.slice(0);j.pfLParam=(f[i]-l[i])/p[i];l[i]=f[i];if(l[h]<-f[h]){o=l[h]+f[h];j.rfSqrDistance+=(o*o);l[h]=-f[h];}else{if(l[h]>f[h]){o=l[h]-f[h];j.rfSqrDistance+=(o*o);l[h]=f[h];}}if(l[g]<-f[g]){o=l[g]+f[g];j.rfSqrDistance+=(o*o);l[g]=-f[g];}else{if(l[g]>f[g]){o=l[g]-f[g];j.rfSqrDistance+=(o*o);l[g]=f[g];}}b.copyFromArray(j.rkPnt,l);};e.prototype.case000=function(g,f){var h=0;var i=f.getHalfSideLengths();if(g.rkPnt[0]<-i[0]){h=g.rkPnt[0]+i[0];g.rfSqrDistance+=(h*h);g.rkPnt[0]=-i[0];}else{if(g.rkPnt[0]>i[0]){h=g.rkPnt[0]-i[0];g.rfSqrDistance+=(h*h);g.rkPnt[0]=i[0];}}if(g.rkPnt[1]<-i[1]){h=g.rkPnt[1]+i[1];g.rfSqrDistance+=(h*h);g.rkPnt[1]=-i[1];}else{if(g.rkPnt[1]>i[1]){h=g.rkPnt[1]-i[1];g.rfSqrDistance+=(h*h);g.rkPnt[1]=i[1];}}if(g.rkPnt[2]<-i[2]){h=g.rkPnt[2]+i[2];g.rfSqrDistance+=(h*h);g.rkPnt[2]=-i[2];}else{if(g.rkPnt[2]>i[2]){h=g.rkPnt[2]-i[2];g.rfSqrDistance+=(h*h);g.rkPnt[2]=i[2];}}};a.JSegment=e;})(jigLib);