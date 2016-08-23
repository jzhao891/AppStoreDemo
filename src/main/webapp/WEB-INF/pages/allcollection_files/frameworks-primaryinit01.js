/*
** Copyright © 2016 Apple Inc.
** All rights reserved.
*/

typeof its=="undefined"&&(its={}),its.sf||(its.sf={}),its.sf.DelayedCallQueue={},its.sf.DelayedCallQueue._queue={},its.sf.DelayedCallQueue._handlerObjectsCache={},its.sf.DelayedCallQueue.call=function(handlerObjectName,aFunction){var handlerObject=its.sf.DelayedCallQueue._handlerObjectsCache[handlerObject];
if(!handlerObject)try{handlerObject=eval(handlerObjectName),handlerObject&&typeof handlerObject!="undefined"&&(its.sf.DelayedCallQueue._handlerObjectsCache=handlerObject)}catch(anException){}var handlerObjectFunctionArray=its.sf.DelayedCallQueue._queue[handlerObjectName];
!handlerObject||typeof handlerObject=="undefined"?(handlerObjectFunctionArray||(handlerObjectFunctionArray=[],its.sf.DelayedCallQueue._queue[handlerObjectName]=handlerObjectFunctionArray),handlerObjectFunctionArray.push(aFunction)):(its.sf.DelayedCallQueue.objectReady(handlerObjectName),aFunction())},its.sf.DelayedCallQueue.objectReady=function(e){var t=its.sf.DelayedCallQueue._queue[e];
if(t){for(var n=0;
n<t.length;
n++)t[n]();
its.sf.DelayedCallQueue._queue[e]=null,delete its.sf.DelayedCallQueue._queue[e]}},window.its||(window.its={}),its.isDefined=function(t){return typeof t!="undefined"},its.isDefinedNonNull=function(t){return its.isDefined(t)&&t!=null},window.EXCEPTION_LOGGER_NAME="ITSExceptionHandler",window._itsOnErrorCallback=function(t,n,r){if(t&&t instanceof Event){var i=t.target;
i&&(t="Error attempting to load a script: id="+i.id+" src="+i.src+" type="+i.type+", contents:"+i.innerHTML)}var s={message:t,url:n,lineNumber:r},o=window._attemptedDelayedShowEarlyExceptionComposedMessage;
o?s=window._attemptedDelayedShowEarlyExceptionServerDataDict:o=window._itsComposeErrorMessage(t,n,r,window.EXCEPTION_LOGGER_NAME),window._earlyOnerrorException||(window._earlyOnerrorException={message:t,url:n,lineNumber:r}),window._itsOnErrorCallbackRobust?window._itsOnErrorCallbackRobust(o,s):window._itsOnErrorCallbackFailsafe(o,s),window._tryShowingErrorIndicator(o)},window._itsOnErrorCallbackRobust=function(t,n){try{window.ITSLogger&&ITSLogger.isLoaded?ITSLogger.named(window.EXCEPTION_LOGGER_NAME).error(t,n,!0,null):window.ITSLogger?ITSLogger.queueMessage(window.EXCEPTION_LOGGER_NAME,ITSLogger.ERROR,t,!0,null,n):window._itsOnErrorCallbackFailsafe(t,n)}catch(r){window._itsOnErrorCallbackFailsafe("Exception in exception logging: "+r.toString()+", url:"+r.sourceURL+", lineNumber:"+r.line)}},window._itsOnErrorCallbackFailsafe=function(t,n){if(window._attemptedDelayedShowEarlyExceptionComposedMessage==null)window._attemptedDelayedShowEarlyExceptionComposedMessage=t,window._attemptedDelayedShowEarlyExceptionServerDataDict=n,window.setTimeout(window._itsOnErrorCallback,1e3);
else{var r=null;
its.isDefined(iTunes)&&iTunes.loggingEnabled&&iTunes.log?r=function(e){iTunes.log(e)}:console&&console.log&&(r=function(e){console.log(e)}),r&&t&&r(t)}},window._itsComposeErrorMessage=function(t,n,r,i){var s="",o="unknown (might be html-embedded script?)",u="unknown";
its.isDefinedNonNull(n)&&n!=""&&n!="undefined"&&(o=n),its.isDefinedNonNull(r)&&r!=""&&(u=r),i&&(s=i+":");
var a=s+'{message:"'+t+'", url:"'+o+'", lineNumber:"'+u+'"}';
return a},window._tryShowingErrorIndicator=function(t){var n=10;
window._attemptedShowErrorIndicator==null&&(window._attemptedShowErrorIndicator=0),window._attemptedShowErrorIndicator<n&&(window.ITSLogger&&ITSLogger.showErrorIndicator?(window._attemptedShowErrorIndicator=n+1,ITSLogger.showErrorIndicator(t)):window._attemptedShowErrorIndicator<n&&(window._attemptedShowErrorIndicator++,window.setTimeout(function(){window._tryShowingErrorIndicator(t)},1e3)))},window.onerror=window._itsOnErrorCallback,window.earlyLoadITSLogger={},window.ITSLogger||(window.ITSLogger=window.earlyLoadITSLogger),ITSLogger.DEBUG=1,ITSLogger.INFO=2,ITSLogger.WARN=3,ITSLogger.ERROR=4,ITSLogger.STATS=5,ITSLogger.timeAtLoad=(new Date).getTime(),ITSLogger.queueMessage=function(t,n,r,i,s){arguments.length>=3&&(ITSLogger._queuedMessages||(ITSLogger._queuedMessages=[]),ITSLogger._queuedMessages.push({loggerName:t,loggingThreshold:n,message:r,serverDataDict:s,mirrorToServer:i}))},ITSLogger.possiblyWaitForQueueMessages=function(){var t=its.property&&its.property("itsLoggerQueueProcessingInterval");
t=t?t:1e3,ITSLogger._queuedMessages&&ITSLogger._queuedMessages.length&&t>0&&ITSLogger._delayedProcessQueuedMessages(t)},ITSLogger._processQueuedMessages=function(){ITSLogger.possiblyWaitForQueueMessages()},ITSLogger._delayedProcessQueuedMessages=function(t){window.setTimeout(ITSLogger._processQueuedMessages,t)},ITSStopwatch=function ITSStopwatch(e){this.reset(),e||(e="default"),this._name=e,this._hasLoggedToServer=!1,ITSStopwatch.stopwatches||(ITSStopwatch.stopwatches={}),ITSStopwatch.stopwatches[e]=this},ITSStopwatch.named=function(t){var n=null;
return t||(t="default"),ITSStopwatch.stopwatches&&(n=ITSStopwatch.stopwatches[t]),n||(n=new ITSStopwatch(t)),n},ITSStopwatch.currentTime=function(){return(new Date).getTime()},ITSStopwatch.prototype={start:function(t){return this._stopTime!=-1?this._startTime+=ITSStopwatch.currentTime()-this._stopTime:this._startTime=t?t:ITSStopwatch.currentTime(),this._startTime},stop:function(){this._stopTime=ITSStopwatch.currentTime();
var t=this.elapsedTime(),n=this.splitTimes(),r=null;
for(var i in n)r=n[i],r._stopTime==-1&&(r._stopTime=this._stopTime);
return t},reset:function(){this._startTime=-1,this._stopTime=-1,this._elapsedTimes={}},elapsedTime:function(t){t||(t=this._stopTime!=-1?this._stopTime:ITSStopwatch.currentTime());
var n=t-this._startTime;
return n<0&&(this._negativeElapsedTime=!0,this._negativeElapsedTimeStartTime=this._startTime,this._negativeElapsedTimeStopTime=t,this.logToConsole("error","Negative elapsedTime calculated: "+n+" (endTime was: "+t+" startTime was: "+this._startTime)),n},name:function(){return this._name},startSplitTimeNamed:function(t){t||(t="default");
var n=this.name()+"_"+t,r=ITSStopwatch.named(n);
return r.reset(),r.start()},stopSplitTimeNamed:function(t,n){t||(t="default");
var r=this.name()+"_"+t,i=ITSStopwatch.named(r),s=i.stop();
return n&&this.logPrettyInfoToConsole(t,s),s},splitTimes:function(){var t={},n=null;
for(var r in ITSStopwatch.stopwatches)r.indexOf(this.name()+"_")===0&&(n=r.substr((this.name()+"_").length),t[n]=ITSStopwatch.stopwatches[r]);
return t},splitTimeNamed:function(t){var n=this.name()+"_"+t;
return ITSStopwatch.named(n)},markElapsedTimeNamed:function(t,n){t||(t="default");
var r=this.elapsedTime(ITSStopwatch.currentTime());
return this._elapsedTimes[t]=r,n&&this.logPrettyInfoToConsole(t,r),r},markedElapsedTimes:function(){return this._elapsedTimes},markedElapsedTimeNamed:function(t){return this._elapsedTimes[t]},logToConsole:function(t,n){window.ITSLogger&&ITSLogger.isLoaded?ITSLogger.named(this.name())[t](n):console&&console.log&&localStorage.getItem("ITSStopWatch.debug")&&console.log(this.name()+": "+n)},logPrettyInfoToConsole:function(t,n){var r=t+"["+n+"]";
this.logToConsole("info",r)},logToServer:function(t){this.stop();
var n=t?t:{};
n.elapsedTimeSinceTimerCreation=this.elapsedTime(),n.negativeElapsedTime=this._negativeElapsedTime,n.negativeElapsedTimeStartTime=this._negativeElapsedTimeStartTime,n.negativeElapsedTimeStopTime=this._negativeElapsedTimeStopTime;
var r=this.splitTimes();
for(var i in r)n[i]=r[i].elapsedTime();
var s=this.markedElapsedTimes();
for(var o in s)n[o]=s[o];
window.ITSLogger&&ITSLogger.isLoaded&&(ITSLogger.named(this.name()).stats(null,n,!0),this._hasLoggedToServer=!0)},hasLoggedToServer:function(){return this._hasLoggedToServer}},ITSStopwatch.named("ITSLoadTimes").start(its.markupLoadStartTime),window.addEventListener("DOMContentLoaded",function(){ITSStopwatch.named("ITSLoadTimes").markElapsedTimeNamed("DOMContentLoaded",!0)},!0),window.addEventListener("load",function(){ITSStopwatch.named("ITSLoadTimes").markElapsedTimeNamed("load",!0),its.kit||window.setTimeout(function(){ITSStopwatch.named("ITSLoadTimes").markElapsedTimeNamed("afterLoad",!0)},1)},!0),window.setTimeout(function(){var t=ITSStopwatch.named("ITSLoadTimes");
t.hasLoggedToServer()||t.logToServer({failsafeTimeout:!0,probableExceptionDuringLoad:!0})},31e3),iTSDefer=function(){var e=[],t=!1,n=function(t){i()?e.push(t):t()},r=function(){t||(window.preventDeferJsLoad=!0);
if(!i())return;for(var n=0;
n<e.length;
n++)e[n]()},i=function(){return!window.preventDeferJsLoad},s=function(){t=!0};
return{register:n,execute:r,isDeferSupported:i,setBodyWasParsed:s}}()