from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

router_v1 = DefaultRouter('v1')

urlpatterns = [
    url(r'^trainings/', include(('hajj_hakathon.trainings.routers', 'hajj_hakathon.trainings'),
        namespace='rest_trainings')),

] + router_v1.urls
