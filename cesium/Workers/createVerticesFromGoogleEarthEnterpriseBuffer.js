define(["./AxisAlignedBoundingBox-c7183545","./Transforms-713aa3a8","./Matrix2-163b5a1d","./Matrix3-b6f074fa","./defaultValue-0a909f67","./TerrainEncoding-01618fc4","./Math-e97915da","./OrientedBoundingBox-e3f4d571","./RuntimeError-06c93819","./WebMercatorProjection-8e29b101","./createTaskProcessorWorker","./combine-ca22a614","./AttributeCompression-e18a879a","./ComponentDatatype-77274976","./WebGLConstants-a8cc3e8c","./EllipsoidTangentPlane-8eee3c2f","./IntersectionTests-87baf287","./Plane-1c5a21a3"],(function(t,e,n,i,o,a,r,s,c,u,h,l,d,g,m,p,I,f){"use strict";const E=Uint16Array.BYTES_PER_ELEMENT,T=Int32Array.BYTES_PER_ELEMENT,C=Uint32Array.BYTES_PER_ELEMENT,M=Float32Array.BYTES_PER_ELEMENT,x=Float64Array.BYTES_PER_ELEMENT;function N(t,e,n){n=o.defaultValue(n,r.CesiumMath);const i=t.length;for(let o=0;o<i;++o)if(n.equalsEpsilon(t[o],e,r.CesiumMath.EPSILON12))return o;return-1}const b=new i.Cartographic,S=new i.Cartesian3,w=new i.Cartesian3,B=new i.Cartesian3,P=new n.Matrix4;function A(t,e,a,s,c,u,h,l,d,g,m){const p=l.length;for(let I=0;I<p;++I){const f=l[I],E=f.cartographic,T=f.index,C=t.length,M=E.longitude;let x=E.latitude;x=r.CesiumMath.clamp(x,-r.CesiumMath.PI_OVER_TWO,r.CesiumMath.PI_OVER_TWO);const N=E.height-h.skirtHeight;h.hMin=Math.min(h.hMin,N),i.Cartographic.fromRadians(M,x,N,b),g&&(b.longitude+=d),g?I===p-1?b.latitude+=m:0===I&&(b.latitude-=m):b.latitude+=d;const w=h.ellipsoid.cartographicToCartesian(b);t.push(w),e.push(N),a.push(n.Cartesian2.clone(a[T])),s.length>0&&s.push(s[T]),c.length>0&&c.push(c[T]),n.Matrix4.multiplyByPoint(h.toENU,w,S);const B=h.minimum,P=h.maximum;i.Cartesian3.minimumByComponent(S,B,B),i.Cartesian3.maximumByComponent(S,P,P);const A=h.lastBorderPoint;if(o.defined(A)){const t=A.index;u.push(t,C-1,C,C,T,t)}h.lastBorderPoint=f}}return h((function(h,l){h.ellipsoid=i.Ellipsoid.clone(h.ellipsoid),h.rectangle=n.Rectangle.clone(h.rectangle);const d=function(h,l,d,g,m,p,I,f,y,R,_){let W,v,F,O,V,Y;o.defined(g)?(W=g.west,v=g.south,F=g.east,O=g.north,V=g.width,Y=g.height):(W=r.CesiumMath.toRadians(m.west),v=r.CesiumMath.toRadians(m.south),F=r.CesiumMath.toRadians(m.east),O=r.CesiumMath.toRadians(m.north),V=r.CesiumMath.toRadians(g.width),Y=r.CesiumMath.toRadians(g.height));const U=[v,O],k=[W,F],H=e.Transforms.eastNorthUpToFixedFrame(l,d),L=n.Matrix4.inverseTransformation(H,P);let D,G;y&&(D=u.WebMercatorProjection.geodeticLatitudeToMercatorAngle(v),G=1/(u.WebMercatorProjection.geodeticLatitudeToMercatorAngle(O)-D));const j=1!==p,z=new DataView(h);let q=Number.POSITIVE_INFINITY,J=Number.NEGATIVE_INFINITY;const K=w;K.x=Number.POSITIVE_INFINITY,K.y=Number.POSITIVE_INFINITY,K.z=Number.POSITIVE_INFINITY;const Q=B;Q.x=Number.NEGATIVE_INFINITY,Q.y=Number.NEGATIVE_INFINITY,Q.z=Number.NEGATIVE_INFINITY;let X,Z,$=0,tt=0,et=0;for(Z=0;Z<4;++Z){let t=$;X=z.getUint32(t,!0),t+=C;const e=r.CesiumMath.toRadians(180*z.getFloat64(t,!0));t+=x,-1===N(k,e)&&k.push(e);const n=r.CesiumMath.toRadians(180*z.getFloat64(t,!0));t+=x,-1===N(U,n)&&U.push(n),t+=2*x;let i=z.getInt32(t,!0);t+=T,tt+=i,i=z.getInt32(t,!0),et+=3*i,$+=X+C}const nt=[],it=[],ot=new Array(tt),at=new Array(tt),rt=new Array(tt),st=y?new Array(tt):[],ct=j?new Array(tt):[],ut=new Array(et),ht=[],lt=[],dt=[],gt=[];let mt=0,pt=0;for($=0,Z=0;Z<4;++Z){X=z.getUint32($,!0),$+=C;const t=$,e=r.CesiumMath.toRadians(180*z.getFloat64($,!0));$+=x;const o=r.CesiumMath.toRadians(180*z.getFloat64($,!0));$+=x;const a=r.CesiumMath.toRadians(180*z.getFloat64($,!0)),s=.5*a;$+=x;const h=r.CesiumMath.toRadians(180*z.getFloat64($,!0)),l=.5*h;$+=x;const g=z.getInt32($,!0);$+=T;const m=z.getInt32($,!0);$+=T,$+=T;const p=new Array(g);for(let t=0;t<g;++t){const c=e+z.getUint8($++)*a;b.longitude=c;const g=o+z.getUint8($++)*h;b.latitude=g;let m=z.getFloat32($,!0);if($+=M,0!==m&&m<_&&(m*=-Math.pow(2,R)),m*=6371010,b.height=m,-1!==N(k,c)||-1!==N(U,g)){const e=N(nt,b,i.Cartographic);if(-1!==e){p[t]=it[e];continue}nt.push(i.Cartographic.clone(b)),it.push(mt)}p[t]=mt,Math.abs(c-W)<s?ht.push({index:mt,cartographic:i.Cartographic.clone(b)}):Math.abs(c-F)<s?dt.push({index:mt,cartographic:i.Cartographic.clone(b)}):Math.abs(g-v)<l?lt.push({index:mt,cartographic:i.Cartographic.clone(b)}):Math.abs(g-O)<l&&gt.push({index:mt,cartographic:i.Cartographic.clone(b)}),q=Math.min(m,q),J=Math.max(m,J),rt[mt]=m;const I=d.cartographicToCartesian(b);if(ot[mt]=I,y&&(st[mt]=(u.WebMercatorProjection.geodeticLatitudeToMercatorAngle(g)-D)*G),j){const t=d.geodeticSurfaceNormal(I);ct[mt]=t}n.Matrix4.multiplyByPoint(L,I,S),i.Cartesian3.minimumByComponent(S,K,K),i.Cartesian3.maximumByComponent(S,Q,Q);let f=(c-W)/(F-W);f=r.CesiumMath.clamp(f,0,1);let E=(g-v)/(O-v);E=r.CesiumMath.clamp(E,0,1),at[mt]=new n.Cartesian2(f,E),++mt}const I=3*m;for(let t=0;t<I;++t,++pt)ut[pt]=p[z.getUint16($,!0)],$+=E;if(X!==$-t)throw new c.RuntimeError("Invalid terrain tile.")}ot.length=mt,at.length=mt,rt.length=mt,y&&(st.length=mt);j&&(ct.length=mt);const It=mt,ft=pt,Et={hMin:q,lastBorderPoint:void 0,skirtHeight:f,toENU:L,ellipsoid:d,minimum:K,maximum:Q};ht.sort((function(t,e){return e.cartographic.latitude-t.cartographic.latitude})),lt.sort((function(t,e){return t.cartographic.longitude-e.cartographic.longitude})),dt.sort((function(t,e){return t.cartographic.latitude-e.cartographic.latitude})),gt.sort((function(t,e){return e.cartographic.longitude-t.cartographic.longitude}));const Tt=1e-5;if(A(ot,rt,at,st,ct,ut,Et,ht,-Tt*V,!0,-Tt*Y),A(ot,rt,at,st,ct,ut,Et,lt,-Tt*Y,!1),A(ot,rt,at,st,ct,ut,Et,dt,Tt*V,!0,Tt*Y),A(ot,rt,at,st,ct,ut,Et,gt,Tt*Y,!1),ht.length>0&&gt.length>0){const t=ht[0].index,e=It,n=gt[gt.length-1].index,i=ot.length-1;ut.push(n,i,e,e,t,n)}tt=ot.length;const Ct=e.BoundingSphere.fromPoints(ot);let Mt;o.defined(g)&&(Mt=s.OrientedBoundingBox.fromRectangle(g,q,J,d));const xt=new a.EllipsoidalOccluder(d).computeHorizonCullingPointPossiblyUnderEllipsoid(l,ot,q),Nt=new t.AxisAlignedBoundingBox(K,Q,l),bt=new a.TerrainEncoding(l,Nt,Et.hMin,J,H,!1,y,j,p,I),St=new Float32Array(tt*bt.stride);let wt=0;for(let t=0;t<tt;++t)wt=bt.encode(St,wt,ot[t],at[t],rt[t],void 0,st[t],ct[t]);const Bt=ht.map((function(t){return t.index})).reverse(),Pt=lt.map((function(t){return t.index})).reverse(),At=dt.map((function(t){return t.index})).reverse(),yt=gt.map((function(t){return t.index})).reverse();return Pt.unshift(At[At.length-1]),Pt.push(Bt[0]),yt.unshift(Bt[Bt.length-1]),yt.push(At[0]),{vertices:St,indices:new Uint16Array(ut),maximumHeight:J,minimumHeight:q,encoding:bt,boundingSphere3D:Ct,orientedBoundingBox:Mt,occludeePointInScaledSpace:xt,vertexCountWithoutSkirts:It,indexCountWithoutSkirts:ft,westIndicesSouthToNorth:Bt,southIndicesEastToWest:Pt,eastIndicesNorthToSouth:At,northIndicesWestToEast:yt}}(h.buffer,h.relativeToCenter,h.ellipsoid,h.rectangle,h.nativeRectangle,h.exaggeration,h.exaggerationRelativeHeight,h.skirtHeight,h.includeWebMercatorT,h.negativeAltitudeExponentBias,h.negativeElevationThreshold),g=d.vertices;l.push(g.buffer);const m=d.indices;return l.push(m.buffer),{vertices:g.buffer,indices:m.buffer,numberOfAttributes:d.encoding.stride,minimumHeight:d.minimumHeight,maximumHeight:d.maximumHeight,boundingSphere3D:d.boundingSphere3D,orientedBoundingBox:d.orientedBoundingBox,occludeePointInScaledSpace:d.occludeePointInScaledSpace,encoding:d.encoding,vertexCountWithoutSkirts:d.vertexCountWithoutSkirts,indexCountWithoutSkirts:d.indexCountWithoutSkirts,westIndicesSouthToNorth:d.westIndicesSouthToNorth,southIndicesEastToWest:d.southIndicesEastToWest,eastIndicesNorthToSouth:d.eastIndicesNorthToSouth,northIndicesWestToEast:d.northIndicesWestToEast}}))}));
