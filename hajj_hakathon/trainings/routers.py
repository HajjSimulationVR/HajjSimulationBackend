from rest_framework.routers import DefaultRouter
from .views import TrainingViewSet, TrainingProgressViewSet

router_v1 = DefaultRouter()

router_v1.register('', TrainingViewSet)
router_v1.register('(?P<training_pk>\d+)/progress', TrainingProgressViewSet)
urlpatterns = router_v1.urls
